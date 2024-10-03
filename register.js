//TODO:  store in indexdb?
//Especially if done in service worker, via HTMLRewriter, [w3c willing](https://github.com/whatwg/dom/issues/1222)
/**
 * @type Set<string>
 */
export const registry = new Set();
/**
 * 
 * @param {string | Array<string>} hash 
 */
export function register(hash){
    if(Array.isArray(hash)){
        for(const aHash of hash){
            registry.add(aHash)
        }
    }else{
        registry.add(aHash);
    }
}