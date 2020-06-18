





class Clockdyn extends HTMLElement {
  constructor() {
    super();
    let sadow = this.attachShadow({ mode: 'open' });

    let div = document.createElement("div")
    sadow.appendChild(div)

    this.h1 = document.createElement("h1")
    this.divTime = document.createElement("div")

    div.appendChild(this.h1)
    div.appendChild(this.divTime)

    setInterval(() => {
      let d = new Date();
      d.setHours(d.getHours() + this.tz)
      this.divTime.innerHTML = this.getTemplet(d)
    }, 100);



  }
  getTemplet(date) {
    return `${date.getHours()} : ${date.getMinutes()} : ${date.getSeconds()}`
  }


  static get observedAttributes() { return ["city", "tz"]; }

  attributeChangedCallback(name, oldValue, newValue) {
    console.log('Custom DynClock element attributes changed.', name, oldValue, newValue);

    this.h1.innerHTML = this.getAttribute("city")
    if (name == "tz") {
      this.tz = parseInt(newValue)
    }

  }
}
customElements.define("clock-dyn", Clockdyn)


class ClockdynManager extends HTMLElement {
  constructor() {
    super();
    let sadow = this.attachShadow({ mode: 'open' });
    let s = document.createElement('select')

    let templet = ` <option value=[tz]>[city]</option>`
    let data = [
      { city: "jrusalem", tz: "0" },
      { city: "vyena", tz: "-1" },
      { city: "london", tz: "-2" },
      { city: "kiyev", tz: "0" }
    ]
    s.innerHTML = render(templet, data)
    sadow.appendChild(s)


    let clockdyn = document.querySelector(this.getAttribute("clock-selector"))
    s.onchange = ev => {
      clockdyn.setAttribute("city", s.selectedOptions[0].innerHTML)
      clockdyn.setAttribute("tz", s.value)

    }






    // let divcity = document.createElement("div")
    // sadow.appendChild(divcity)
    // this.labelcity = document.createElement("label")
    // this.labelcity.innerHTML = "city: "
    // divcity.appendChild(this.labelcity)

    // this.inputcity = document.createElement("input")
    // divcity.appendChild(this.inputcity)
    // this.inputcity.oninput = ev => {
    //   this.myclock.setAttribute("city", ev.target.value)
    // }

    // let divtz = document.createElement("div")
    // sadow.appendChild(divtz)
    // const labeltz = document.createElement("label")
    // labeltz.innerHTML = "tz: "
    // divtz.appendChild(labeltz)
    // this.inputtz = document.createElement("input")
    // divtz.appendChild(this.inputtz)
    // this.inputtz.oninput = ev => {
    //   this.myclock.setAttribute("tz", ev.target.value)
    // }
  }
}
customElements.define("clock-dyn-manager", ClockdynManager)




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