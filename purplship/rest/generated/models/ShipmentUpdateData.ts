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
    Payment,
    PaymentFromJSON,
    PaymentFromJSONTyped,
    PaymentToJSON,
} from './Payment';

/**
 * 
 * @export
 * @interface ShipmentUpdateData
 */
export interface ShipmentUpdateData {
    /**
     * The shipment label file type.
     * @type {string}
     * @memberof ShipmentUpdateData
     */
    label_type?: ShipmentUpdateDataLabelTypeEnum;
    /**
     * 
     * @type {Payment}
     * @memberof ShipmentUpdateData
     */
    payment?: Payment;
    /**
     * 
     * <details>
     * <summary>The options available for the shipment.</summary>
     * 
     * ```
     * {
     *     "currency": "USD",
     *     "insurance": 100.00,
     *     "cash_on_delivery": 30.00,
     *     "shipment_date": "2020-01-01",
     *     "dangerous_good": true,
     *     "declared_value": 150.00,
     *     "email_notification": true,
     *     "email_notification_to": "shipper@mail.com",
     *     "signature_confirmation": true,
     * }
     * ```
     * 
     * Please check the docs for carrier specific options.
     * </details>
     * @type {object}
     * @memberof ShipmentUpdateData
     */
    options?: object | null;
    /**
     * The shipment reference
     * @type {string}
     * @memberof ShipmentUpdateData
     */
    reference?: string | null;
    /**
     * User metadata for the shipment
     * @type {object}
     * @memberof ShipmentUpdateData
     */
    metadata?: object;
}

/**
* @export
* @enum {string}
*/
export enum ShipmentUpdateDataLabelTypeEnum {
    Pdf = 'PDF',
    Zpl = 'ZPL'
}

export function ShipmentUpdateDataFromJSON(json: any): ShipmentUpdateData {
    return ShipmentUpdateDataFromJSONTyped(json, false);
}

export function ShipmentUpdateDataFromJSONTyped(json: any, ignoreDiscriminator: boolean): ShipmentUpdateData {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'label_type': !exists(json, 'label_type') ? undefined : json['label_type'],
        'payment': !exists(json, 'payment') ? undefined : PaymentFromJSON(json['payment']),
        'options': !exists(json, 'options') ? undefined : json['options'],
        'reference': !exists(json, 'reference') ? undefined : json['reference'],
        'metadata': !exists(json, 'metadata') ? undefined : json['metadata'],
    };
}

export function ShipmentUpdateDataToJSON(value?: ShipmentUpdateData | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'label_type': value.label_type,
        'payment': PaymentToJSON(value.payment),
        'options': value.options,
        'reference': value.reference,
        'metadata': value.metadata,
    };
}

