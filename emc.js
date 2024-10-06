// @ts-check
import { BeHive, seed, MountObserver } from 'be-hive/be-hive.js';
import { Registry } from 'be-hive/Registry.js';
/** @import {EMC, EventListenerOrFn} from './ts-refs/trans-render/be/types' */
/** @import {Actions, PAP,  AP} from './ts-refs/be-hashing-out/types' */;
/** @import {CSSQuery} from './ts-refs/trans-render/types.js' */

/**
 * @type {Partial<EMC<any, AP>>}
 */
export const emc = {
    base: 'be-hashing-out',
    enhPropKey: 'beHashingOut',
    map: {
        '0.0': {
            instanceOf: 'String',
            mapsTo: 'digest'
        }
    },
    importEnh: async () => {
        const {BeHashingOut} = /** @type {{new(): IEnhancement<Element>}} */ 
        /** @type {any} */
        (await import('./be-hashing-out.js'));
        return BeHashingOut;
    },
}

const mose = seed(emc);
MountObserver.synthesize(document, BeHive, mose);