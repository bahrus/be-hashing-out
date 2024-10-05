// @ts-check
import { BeHive, seed, MountObserver } from 'be-hive/be-hive.js';
import { Registry } from 'be-hive/Registry.js';
/** @import {EMC, EventListenerOrFn} from './ts-refs/trans-render/be/types.d.ts' */
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
            mapsTo: 'hash'
        }
    }
}

const mose = seed(emc);
MountObserver.synthesize(document, BeHive, mose);