/* tslint:disable */
/* eslint-disable */
/**
 * Purplship API
 *  ## API Reference  Purplship is an open source multi-carrier shipping API that simplifies the integration of logistic carrier services.  The Purplship API is organized around REST. Our API has predictable resource-oriented URLs, accepts JSON-encoded request bodies, returns JSON-encoded responses, and uses standard HTTP response codes, authentication, and verbs.  The Purplship API differs for every account as we release new versions. These docs are customized to your version of the API.   ## Versioning  When backwards-incompatible changes are made to the API, a new, dated version is released. The current version is `2022.1`.  Read our API changelog and to learn more about backwards compatibility.  As a precaution, use API versioning to check a new API version before committing to an upgrade.   ## Pagination  All top-level API resources have support for bulk fetches via \"list\" API methods. For instance, you can list addresses, list shipments, and list trackers. These list API methods share a common structure, taking at least these two parameters: limit, and offset.  Purplship utilizes offset-based pagination via the offset and limit parameters. Both parameters take a number as value (see below) and return objects in reverse chronological order. The offset parameter returns objects listed after an index. The limit parameter take a limit on the number of objects to be returned from 1 to 100.   ```json {     \"next\": \"/v1/shipments?limit=25&offset=25\",     \"previous\": \"/v1/shipments?limit=25&offset=25\",     \"results\": [     ] } ```  ## Environments  The Purplship API offer the possibility to create and retrieve certain objects in `test_mode`. In development, it is therefore possible to add carrier connections, get live rates, buy labels, create trackers and schedule pickups in `test_mode`.  
 *
 * The version of the OpenAPI document: 2022.1
 * Contact: hello@purplship.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
import {
    Address,
    AddressFromJSON,
    AddressFromJSONTyped,
    AddressToJSON,
} from './Address';
import {
    Parcel,
    ParcelFromJSON,
    ParcelFromJSONTyped,
    ParcelToJSON,
} from './Parcel';

/**
 * 
 * @export
 * @interface PickupUpdateRequest
 */
export interface PickupUpdateRequest {
    /**
     * 
     * The expected pickup date
     * 
     * Date Format: `YYYY-MM-DD`
     * @type {string}
     * @memberof PickupUpdateRequest
     */
    pickup_date: string;
    /**
     * 
     * @type {Address}
     * @memberof PickupUpdateRequest
     */
    address: Address;
    /**
     * The shipment parcels to pickup.
     * @type {Array<Parcel>}
     * @memberof PickupUpdateRequest
     */
    parcels: Array<Parcel>;
    /**
     * pickup identification number
     * @type {string}
     * @memberof PickupUpdateRequest
     */
    confirmation_number: string;
    /**
     * 
     * The ready time for pickup.
     * 
     * Time Format: `HH:MM`
     * @type {string}
     * @memberof PickupUpdateRequest
     */
    ready_time: string;
    /**
     * 
     * The closing or late time of the pickup
     * 
     * Time Format: `HH:MM`
     * @type {string}
     * @memberof PickupUpdateRequest
     */
    closing_time: string;
    /**
     * 
     * The pickup instruction.
     * 
     * eg: Handle with care.
     * @type {string}
     * @memberof PickupUpdateRequest
     */
    instruction?: string | null;
    /**
     * 
     * The package(s) location.
     * 
     * eg: Behind the entrance door.
     * @type {string}
     * @memberof PickupUpdateRequest
     */
    package_location?: string | null;
    /**
     * Advanced carrier specific pickup options
     * @type {object}
     * @memberof PickupUpdateRequest
     */
    options?: object | null;
}

export function PickupUpdateRequestFromJSON(json: any): PickupUpdateRequest {
    return PickupUpdateRequestFromJSONTyped(json, false);
}

export function PickupUpdateRequestFromJSONTyped(json: any, ignoreDiscriminator: boolean): PickupUpdateRequest {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'pickup_date': json['pickup_date'],
        'address': AddressFromJSON(json['address']),
        'parcels': ((json['parcels'] as Array<any>).map(ParcelFromJSON)),
        'confirmation_number': json['confirmation_number'],
        'ready_time': json['ready_time'],
        'closing_time': json['closing_time'],
        'instruction': !exists(json, 'instruction') ? undefined : json['instruction'],
        'package_location': !exists(json, 'package_location') ? undefined : json['package_location'],
        'options': !exists(json, 'options') ? undefined : json['options'],
    };
}

export function PickupUpdateRequestToJSON(value?: PickupUpdateRequest | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'pickup_date': value.pickup_date,
        'address': AddressToJSON(value.address),
        'parcels': ((value.parcels as Array<any>).map(ParcelToJSON)),
        'confirmation_number': value.confirmation_number,
        'ready_time': value.ready_time,
        'closing_time': value.closing_time,
        'instruction': value.instruction,
        'package_location': value.package_location,
        'options': value.options,
    };
}

