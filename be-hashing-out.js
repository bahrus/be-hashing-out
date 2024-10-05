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
    logHash(self) {
        const {enhancedElement} = self;
        const outer = enhancedElement.outerHTML;
        console.log({outer});
        return /** @type {PAP} */({
            resolved: true
        });
    }
}

await BeHashingOut.bootUp();
export {BeHashingOut};