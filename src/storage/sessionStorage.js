export const  setVuexKeys = (keyName) => {
  let vuexKeys = [], getKeys  
  if(sessionStorage.getItem('vuex_keys') == null){
      vuexKeys.push(keyName)
      sessionStorage.setItem('vuex_keys',JSON.stringify(vuexKeys))
  } else{
      vuexKeys = JSON.parse(sessionStorage.getItem('vuex_keys'))
      let index = vuexKeys.findIndex(x => x == keyName)
      if(index < 0){
        vuexKeys.push(keyName)
        sessionStorage.setItem('vuex_keys',JSON.stringify(vuexKeys))
      }
  }
}

export const getSetSessionVuex = (store) => {
  let vuexKeys = JSON.parse(sessionStorage.getItem('vuex_keys'))
  if(vuexKeys !=null && vuexKeys.length>0) {
     for(let i =0 ; i<vuexKeys.length; i++){
       let sessionData = JSON.parse(sessionStorage.getItem(vuexKeys[i]))
       store.commit(vuexKeys[i],sessionData)
     }
  }
}

