var { 
  topupFreeFire,
  payDiamond
} = require("./freefire");

async function topupFreeFiree(id, jumlah, nomor) {
const makeSession = await topupFreeFire(id, jumlah, nomor) // support nominal 5 12 70 140 355 720'
// console.log(makeSession) if get more property
return await payDiamond(makeSession, nomor)
} 
module.exports.topupFreeFiree = topupFreeFiree