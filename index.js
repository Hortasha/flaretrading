require('isomorphic-fetch');

let pairs = [
    {
        pair: ["YFIN", "YFLR"],
        value: '0xE9689fA4a0984F301953Df0e379C1DEAF6236B44'
    },
    {
        pair: ["xUSD", "YFIN"],
        value: '0xb9B6E181E16dF979fa6B0A7C74F4cdB6D446034F'
    },
    {
        pair: ["FXRP", "YFIN"],
        value: '0xEF248902b7C8C33d1a516Aa220739AfD671Ebc10'
    },
    {
        pair: ["YFIN", "FLTC"],
        value: '0xD044a0ed49198479FC57A2580974B9F9382a90Cf'
    },
    {
        pair: ["YFIN", "FDOGE"],
        value: '0x62Ac5e918d3139f5Ea10ddbF6A619DDD98d734E0'
    },
    {
        pair: ["xUSD", "YFLR"],
        value: '0x25E99C874BB80F21FC1c65AC005fD5Af4A680155'
    },
    {
        pair: ["FXRP", "YFLR"],
        value: '0x19eA74F54056Ea09CC1b1E83B07f00C2C2ea67F3'
    },
    {
        pair: ["FLTC", "YFLR"],
        value: '0x6DaF7873d142726e00B314d81D93D4B54F6E3D0B'
    },
    {
        pair: ["YFLR", "FDOGE"],
        value: '0x294102AF7E5cCe9FE596f267C8af5D8fBc37DFB0'
    },
    {
        pair: ["xUSD", "FXRP"],
        value: '0x9AA10aC3ADb4a6e0fb76d21beBAeb5993426C986'
    },
    {
        pair: ["xUSD", "FLTC"],
        value: '0x45dEaeFB268c7C8305802A7618106f51F3845958'
    },
    {
        pair: ["xUSD", "FDOGE"],
        value: '0x86CCE82054E0Ae2aB0AF44b8De4eA4197941b790'
    },
    {
        pair: ["FXRP", "FLTC"],
        value: '0x0C4B0Da5A4B3D8B4182A376dB273481Fce8785Dc'
    },
    {
        pair: ["FXRP", "FDOGE"],
        value: '0x1529f07450d589aE89cA047d1644c21E5312380e'
    },
    {
        pair: ["FLTC", "FDOGE"],
        value: '0x4152610b5bba5E1B730853d340367341468C95C5'
    }
]

async function getPrices () {

    let rates = {
        YFIN: {
        },
        YFLR: {
        },
        xUSD: {
        },
        FXRP: {
        },
        FLTC: {
        },
        FDOGE: {
        }
    }
    
    for(let i = 0; i < pairs.length; i++) {
        let pricedata = await getPrice(pairs[i].value)
        rates[pairs[i].pair[0]][pairs[i].pair[1]] = (1/pricedata[0].rate)/1000*996;
        rates[pairs[i].pair[1]][pairs[i].pair[0]] = pricedata[0].rate/1000*996;    
    }
    console.log(rates);
    
    function convert(source, target, capital) {
        
        return capital*rates[source][target]
    }
    
    let result = [];
    
    for(const source in rates) {
        //Every currency
        for(const target in rates[source]) {
            //Every target
            for(const secondtarget in rates[target]) {
                //Second target
                let object = {
                    value: 1,
                    text: ""
                }
                object.value = convert(source, target, object.value);
                object.value = convert(target, secondtarget, object.value);
                object.value = convert(secondtarget, source, object.value);
                object.text += source + " " + target + " " + secondtarget + " " + source;
    
                if(secondtarget != source) {
                    result.push(object);
                }
    
                //back to orginal currency
            }
        }
    }
    
    result.sort((a, b) => (a.value < b.value) ? 1 : -1)
    console.log(result);
}

function getPrice (token) {
    return fetch(`https://flare-index-dev.herokuapp.com/api/v1/rates/price/${token}?direction=buy`)
    .then(response => {
        if(response.status = 200) {
            return response.json()
        } else {
            throw new Error("Issue with api response");
        }
    })
}

getPrices()

//FLTC FXRP YFLR FLTC