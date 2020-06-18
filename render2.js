function render(template, dataArr) {
    let h = ''
    // let r = /\[(.*)\]/g;
    // let properties = template.match(r)
    // for (let i = 0; i < properties.length; i++) {
    //     properties[i] = properties[i].replace('[', '').replace(']', '')
    // }

    let propertiesInTemplate2 = []
    let temparr = template.split('[')
    for (let i = 1; i < temparr.length; i++) {
        let part = temparr[i];
        let arr2 = part.split(']')
        propertiesInTemplate2.push(arr2[0])
    }


   dataArr.forEach(item => {
        let itemHtml = template
        propertiesInTemplate2.forEach(p => {
            let propValue = item[p]
            itemHtml = itemHtml.replace(`[${p}]`, propValue)
        })
        h += itemHtml
        
        
    });
    return h
}