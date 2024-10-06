// @ts-check
import { BE } from 'be-enhanced/BE.js';
import { propInfo, rejected, resolved } from 'be-enhanced/cc.js';
import { registry } from './register.js';
/** @import {BEConfig, IEnhancement, BEAllProps} from './ts-refs/be-enhanced/types.d.ts' */
/** @import {Actions, PAP,  AP, BAP} from './ts-refs/be-hashing-out/types' */;

import { dispatchEvent as de } from 'trans-render/positractions/dispatchEvent.js';

/**
 * @implements {Actions}
 * 
 * 
 */
class BeHashingOut extends BE {

    de = de;
    /**
     * @type {BEConfig<BAP, Actions & IEnhancement, any>}
     */
    static config = {
        propInfo: {
            ...propInfo,
            digest: {}
        },
        actions: {
            logDigest: {
                ifNoneOf: 'digest'
            },
            checkDigest:{
                ifAllOf: 'digest'
            }
        },
        positractions:[resolved, rejected]

    }

    /**
     * 
     * @param {BAP} self 
     */
    async logDigest(self) {
        const {enhancedElement} = self;
        const msg = this.#getVals(enhancedElement.attributes);
        const digest = await this.digestMessage(msg);
        const suggestedAttr = `${be_hashing_out}${digest}"`
        console.error(String.raw `
            Suggested markup:
            <script type=module>
                import {register} from 'be-hashing-out/register.js';
                register('${digest}');
            </script>
            Suggested Attr:
            ${suggestedAttr}
        `);
        return /** @type {PAP} */({
            rejected: true,
            resolved: false,
        });
    }
    /**
     * @type {{[key: string]: string} | undefined}
     */
    #attrsWhenLastChecked;
    /**
     * 
     * @param {NamedNodeMap} attrs 
     */
    #getVals(attrs){
        /** @type {Array<string>} */
        const vals = [];
        this.#attrsWhenLastChecked = {};
        for(const attr of attrs){
            if(attr.name === 'be-hashing-out') continue;
            this.#attrsWhenLastChecked[attr.name] = attr.value;
            vals.push(`${attr.name}=${attr.value}`);
        }
        return vals.join(',');
    }

    /**
     * 
     * @param {BAP} self 
     */
    async checkDigest(self) {
        const {enhancedElement, digest} = self;
        const msg = this.#getVals(enhancedElement.attributes);
        const digest2 = await this.digestMessage(msg);
        if(digest !== digest2 || !registry.has(digest)){
            console.error(`${digest}!==${digest2}`);
            return /** @type {PAP} */({
                rejected: true,
                resolved: false,
            });
        }
        
        return /** @type {PAP} */({
            resolved: true,
            rejected: false,
        });
    }

    /**
     * 
     * @param {string} message 
     * @returns {Promise<string>}
     */
    async digestMessage(message) {
        const encoder = new TextEncoder();
        const data = encoder.encode(message);
        const hashBuffer = await crypto.subtle.digest('SHA-256', data);
        const hashArray = Array.from(new Uint8Array(hashBuffer)); // convert buffer to byte array
        const hashHex = hashArray
            .map((b) => b.toString(16).padStart(2, "0"))
            .join(""); // convert bytes to hex string
        return hashHex;
    }


}

const be_hashing_out = 'be-hashing-out="';
const len = be_hashing_out.length;

await BeHashingOut.bootUp();
export {BeHashingOut};
