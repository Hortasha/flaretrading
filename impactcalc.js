
//Calculate new volume of B
function newVolumeB(volumeA, volumeB, buyAmountA) {
    return volumeA*volumeB/(volumeA+buyAmountA)
}

function convert(volumeA, volumeB, buyAmountA, percentFee) {
    let newVolumeB = volumeA*volumeB/(volumeA+(buyAmountA - buyAmountA*percentFee))
    return volumeB - newVolumeB
}



//Old
function convertOld(source, target, capital, rates) {
    return capital*rates[source][target]
}

function calculateArbsOld(rates, percentFee) {
    let arbs = [];
  
    for(const source in rates) {
      //Every currency
      for(const target in rates[source]) {
          //Every target
          for(const secondtarget in rates[target]) {
              let object3 = {
                  value: 1,
                  text: ""
              }
  
              object3.value = convert(source, target, object3.value - (object3.value/100*percentFee), rates)
              object3.value = convert(target, secondtarget, object3.value - (object3.value/100*percentFee), rates);
              object3.value = convert(secondtarget, source, object3.value - (object3.value/100*percentFee), rates);
              object3.text += source + " => " + target + " => " + secondtarget + " => " + source;
  
              if(secondtarget != source) {
                arbs.push(object3);
              }
              
  
              for(const thirdtarget in rates[secondtarget]) {
  
                  //Second target
                  let object4 = {
                      value: 1,
                      text: ""
                  }
                  object4.value = convert(source, target, object4.value - (object4.value/100*(percentFee+0.05)), rates)
                  object4.value = convert(target, secondtarget, object4.value - (object4.value/100*(percentFee+0.05)), rates);
                  object4.value = convert(secondtarget, thirdtarget, object4.value - (object4.value/100*(percentFee+0.05)), rates);
                  object4.value = convert(thirdtarget, source, object4.value - (object4.value/100*(percentFee+0.05)), rates);
                  object4.text += source + " => " + target + " => " + secondtarget + " => " + thirdtarget + " => " + source;
      
                  if(secondtarget != source && thirdtarget != source) {
                    arbs.push(object4);
                  }
              }
          }
      }
    }
    arbs.sort((a, b) => (a.value < b.value) ? 1 : -1)
    return arbs;
  }

  console.log(convert(100, 200, 10, 0.003))