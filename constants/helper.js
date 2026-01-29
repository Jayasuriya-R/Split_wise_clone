export const isValidString = (str) =>
  str.every(s => typeof s === "string" && s.trim().length > 0);

export const getFormatedPhoneNumber =  (val) => {
 if(!val) return

 const number = val.replace("+91","");
 let num = ""
 for(const n of number){
  if(n === ")" || n === "(" || n === "-" || n === " "){
   continue
  }
  num = num + n;
 }
 return num
}