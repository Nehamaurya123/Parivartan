class Validator {
  
  fields: any = {}
  formElement: any;

  rules: any = {
    email: {
      type: 'regex',
      regex: /^[a-z0-9][a-z0-9-_\.]+@[a-z0-9][a-z0-9-]+[a-z0-9]\.[a-z0-9]{2,10}(?:\.[a-z]{2,10})?$/
    },
    password: {
      type: 'func',
      method: '_password'
    },
    alphabet: {
      type: 'regex',
      regex: /^[a-zA-Z ]+$/
    },
    alphanumeric: {
      type: 'regex',
      regex: /^[a-zA-Z0-9]/
    },
    url: {
      type: 'regex',
      regex: /^(https?):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)*(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/
    }
  }

  constructor(form: any){
    this.formElement = document.forms[form];
    [].forEach.call(document.forms[form], (element: any) => {
      if(element.type === 'submit' || element.type === "reset") return;
      this.fields[element.name] = {
        element: element,
        rule: element.getAttribute('data-validate'),
        value: element.value,
        same: element.getAttribute('data-same'),
        who: element.name,
        dirty: false,
        valid: false
      };
      element.classList.remove('okay');
      element.classList.remove('error');

      this._bind_events(element);
    });
  }

  data(){
    let data: any = {};
    Object.keys(this.fields).forEach((name: any) => {
      data[name] = this.fields[name].value.trim();
      this.fields[name].dirty = false;
    });

    return data;
  }

  resetForm(){
    this.formElement.reset();
  }

  checkDirty(){
    let isDirty = true;

    Object.keys(this.fields).forEach(name => {
      if(!this.fields[name].dirty) isDirty = false;
    });

    return isDirty;
  }

  validate(){
    return this._check_all();
  }

  valid(){
    let isValid = true;

    Object.keys(this.fields).forEach(name => {
      if(!this.fields[name].valid) isValid = false;
    });

    return isValid;

  }

  check(name: any){
    if(name) return this._check_one(name);
  }

  _check_one(name: any){
    return this._check_field(this.fields[name]);
  }

  _check_all(){
    console.log("Checking All");
    Object.keys(this.fields).forEach(name => {
      console.log("name", name);
      this.fields[name].isDirty = true;
      this._blur(this.fields[name]);
    });
  }

  _check_field(field: any){
    field.value = field.element.value;

    let isValid = true;
    // let rules = field.rule.split(",");

    field.rule && field.rule.split(",").forEach((rule:any) => {
      let param = this.rules[rule.trim()] || false;
      if(!param && rule.trim() === "required" && field.value.trim() === ""){
        isValid = false;
      }else if(!param && rule.trim() === "allow-blank" && field.value.trim() === ""){
        isValid = true;
      }else if(param && param.type === 'regex' && !param.regex.test(field.value.trim())){
        isValid = false;
      }
      // else if(param && param.type === 'func' && this[param.func] && !this[param.func].call(this, field.value.trim())){
      //   isValid = false;
      // }

      if(field.same && this.fields[field.same].value.trim() !== field.value) isValid = false;
    })

    return isValid;
  }

  _bind_events(element: any){
    element.addEventListener("blur", this._blur.bind(this, this.fields[element.name]));
    element.addEventListener("focus", this._focus.bind(this, this.fields[element.name]));
  }

  _password(value: any){
    
  }

  _blur(field: any){
    if(!this._check_field(field)){
      field.element.classList.remove('okay');
      field.element.classList.add('error');
      field.valid = false;
    }else{
      field.element.classList.remove('error');
      field.element.classList.add('okay');
      field.valid = true;
    }
  }

  _focus(field: any){
    field.element.classList.remove('error', 'okay');
  }
}

export default Validator;