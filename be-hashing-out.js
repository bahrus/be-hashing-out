// @ts-check
import { BE } from 'be-enhanced/BE.js';
import { propInfo, rejected, resolved } from 'be-enhanced/cc.js';
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
            hash: {}
        },
        actions: {
            logHash: {
                ifNoneOf: 'hash'
            }
        }

    }

    /**
     * 
     * @param {BAP} self 
     */
    async logHash(self) {
        const {enhancedElement} = self;
        const searchStr = 'be-hashing-out=""';
        const outer = enhancedElement.outerHTML;
        const outerWithoutSearchStr = outer.replace(searchStr, '');
        const digest = await this.digestMessage(outer);
        const suggestedHTML = outer.replace(searchStr, `be-hashing-out="${digest}"`);
        console.error(String.raw `
            <div>Suggested markup:</div>
            <script type=module>
                import {register} from 'be-hashing-out/register.js';
                register('${digest}');
            </script>
            ${suggestedHTML}
        `);
        return /** @type {PAP} */({
            resolved: true
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

await BeHashingOut.bootUp();
export {BeHashingOut};