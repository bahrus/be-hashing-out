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
        const outer = enhancedElement.outerHTML.replace('be-hashing-out=""', '');
        const digest = await this.digestMessage(outer);
        console.log({outer, digest});
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