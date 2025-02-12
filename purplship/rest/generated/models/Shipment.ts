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
    Customs,
    CustomsFromJSON,
    CustomsFromJSONTyped,
    CustomsToJSON,
} from './Customs';
import {
    Message,
    MessageFromJSON,
    MessageFromJSONTyped,
    MessageToJSON,
} from './Message';
import {
    Parcel,
    ParcelFromJSON,
    ParcelFromJSONTyped,
    ParcelToJSON,
} from './Parcel';
import {
    Payment,
    PaymentFromJSON,
    PaymentFromJSONTyped,
    PaymentToJSON,
} from './Payment';
import {
    Rate,
    RateFromJSON,
    RateFromJSONTyped,
    RateToJSON,
} from './Rate';

/**
 * The shipments associated with the order.
 * @export
 * @interface Shipment
 */
export interface Shipment {
    /**
     * A unique identifier
     * @type {string}
     * @memberof Shipment
     */
    id?: string;
    /**
     * 
     * @type {Address}
     * @memberof Shipment
     */
    shipper: Address;
    /**
     * 
     * @type {Address}
     * @memberof Shipment
     */
    recipient: Address;
    /**
     * The shipment's parcels
     * @type {Array<Parcel>}
     * @memberof Shipment
     */
    parcels: Array<Parcel>;
    /**
     * 
     * The carriers services requested for the shipment.
     * 
     * Please consult the reference for specific carriers services.<br/>
     * Note that this is a list because on a Multi-carrier rate request you could specify a service per carrier.
     * @type {Array<string>}
     * @memberof Shipment
     */
    services?: Array<string> | null;
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
     * @memberof Shipment
     */
    options?: object | null;
    /**
     * 
     * @type {Payment}
     * @memberof Shipment
     */
    payment?: Payment;
    /**
     * 
     * @type {Customs}
     * @memberof Shipment
     */
    customs?: Customs;
    /**
     * The list for shipment rates fetched previously
     * @type {Array<Rate>}
     * @memberof Shipment
     */
    rates?: Array<Rate>;
    /**
     * The shipment reference
     * @type {string}
     * @memberof Shipment
     */
    reference?: string | null;
    /**
     * The shipment label file type.
     * @type {string}
     * @memberof Shipment
     */
    label_type?: ShipmentLabelTypeEnum;
    /**
     * 
     * The list of configured carriers you wish to get rates from.
     * 
     * *Note that the request will be sent to all carriers in nothing is specified*
     * @type {Array<string>}
     * @memberof Shipment
     */
    carrier_ids?: Array<string> | null;
    /**
     * The attached tracker id
     * @type {string}
     * @memberof Shipment
     */
    tracker_id?: string | null;
    /**
     * 
     * The shipment creation datetime
     * 
     * Date Format: `YYYY-MM-DD HH:MM:SS.mmmmmmz`
     * @type {string}
     * @memberof Shipment
     */
    created_at: string;
    /**
     * User metadata for the shipment
     * @type {object}
     * @memberof Shipment
     */
    metadata?: object;
    /**
     * The list of note or warning messages
     * @type {Array<Message>}
     * @memberof Shipment
     */
    messages?: Array<Message>;
    /**
     * The current Shipment status
     * @type {string}
     * @memberof Shipment
     */
    status?: ShipmentStatusEnum;
    /**
     * The shipment carrier
     * @type {string}
     * @memberof Shipment
     */
    carrier_name?: string | null;
    /**
     * The shipment carrier configured identifier
     * @type {string}
     * @memberof Shipment
     */
    carrier_id?: string | null;
    /**
     * The shipment label in base64 string
     * @type {string}
     * @memberof Shipment
     */
    label?: string | null;
    /**
     * The shipment tracking number
     * @type {string}
     * @memberof Shipment
     */
    tracking_number?: string | null;
    /**
     * The shipment carrier system identifier
     * @type {string}
     * @memberof Shipment
     */
    shipment_identifier?: string | null;
    /**
     * 
     * @type {Rate}
     * @memberof Shipment
     */
    selected_rate?: Rate;
    /**
     * provider specific metadata
     * @type {object}
     * @memberof Shipment
     */
    meta?: object | null;
    /**
     * The selected service
     * @type {string}
     * @memberof Shipment
     */
    service?: string | null;
    /**
     * The shipment selected rate.
     * @type {string}
     * @memberof Shipment
     */
    selected_rate_id?: string | null;
    /**
     * The shipment tracking url
     * @type {string}
     * @memberof Shipment
     */
    tracking_url?: string | null;
    /**
     * Specified whether it was created with a carrier in test mode
     * @type {boolean}
     * @memberof Shipment
     */
    test_mode: boolean;
    /**
     * Specifies the object type
     * @type {string}
     * @memberof Shipment
     */
    object_type?: string;
}

/**
* @export
* @enum {string}
*/
export enum ShipmentLabelTypeEnum {
    Pdf = 'PDF',
    Zpl = 'ZPL'
}/**
* @export
* @enum {string}
*/
export enum ShipmentStatusEnum {
    Created = 'created',
    Purchased = 'purchased',
    Cancelled = 'cancelled',
    Shipped = 'shipped',
    InTransit = 'in-transit',
    Delivered = 'delivered'
}

export function ShipmentFromJSON(json: any): Shipment {
    return ShipmentFromJSONTyped(json, false);
}

export function ShipmentFromJSONTyped(json: any, ignoreDiscriminator: boolean): Shipment {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': !exists(json, 'id') ? undefined : json['id'],
        'shipper': AddressFromJSON(json['shipper']),
        'recipient': AddressFromJSON(json['recipient']),
        'parcels': ((json['parcels'] as Array<any>).map(ParcelFromJSON)),
        'services': !exists(json, 'services') ? undefined : json['services'],
        'options': !exists(json, 'options') ? undefined : json['options'],
        'payment': !exists(json, 'payment') ? undefined : PaymentFromJSON(json['payment']),
        'customs': !exists(json, 'customs') ? undefined : CustomsFromJSON(json['customs']),
        'rates': !exists(json, 'rates') ? undefined : ((json['rates'] as Array<any>).map(RateFromJSON)),
        'reference': !exists(json, 'reference') ? undefined : json['reference'],
        'label_type': !exists(json, 'label_type') ? undefined : json['label_type'],
        'carrier_ids': !exists(json, 'carrier_ids') ? undefined : json['carrier_ids'],
        'tracker_id': !exists(json, 'tracker_id') ? undefined : json['tracker_id'],
        'created_at': json['created_at'],
        'metadata': !exists(json, 'metadata') ? undefined : json['metadata'],
        'messages': !exists(json, 'messages') ? undefined : ((json['messages'] as Array<any>).map(MessageFromJSON)),
        'status': !exists(json, 'status') ? undefined : json['status'],
        'carrier_name': !exists(json, 'carrier_name') ? undefined : json['carrier_name'],
        'carrier_id': !exists(json, 'carrier_id') ? undefined : json['carrier_id'],
        'label': !exists(json, 'label') ? undefined : json['label'],
        'tracking_number': !exists(json, 'tracking_number') ? undefined : json['tracking_number'],
        'shipment_identifier': !exists(json, 'shipment_identifier') ? undefined : json['shipment_identifier'],
        'selected_rate': !exists(json, 'selected_rate') ? undefined : RateFromJSON(json['selected_rate']),
        'meta': !exists(json, 'meta') ? undefined : json['meta'],
        'service': !exists(json, 'service') ? undefined : json['service'],
        'selected_rate_id': !exists(json, 'selected_rate_id') ? undefined : json['selected_rate_id'],
        'tracking_url': !exists(json, 'tracking_url') ? undefined : json['tracking_url'],
        'test_mode': json['test_mode'],
        'object_type': !exists(json, 'object_type') ? undefined : json['object_type'],
    };
}

export function ShipmentToJSON(value?: Shipment | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'shipper': AddressToJSON(value.shipper),
        'recipient': AddressToJSON(value.recipient),
        'parcels': ((value.parcels as Array<any>).map(ParcelToJSON)),
        'services': value.services,
        'options': value.options,
        'payment': PaymentToJSON(value.payment),
        'customs': CustomsToJSON(value.customs),
        'rates': value.rates === undefined ? undefined : ((value.rates as Array<any>).map(RateToJSON)),
        'reference': value.reference,
        'label_type': value.label_type,
        'carrier_ids': value.carrier_ids,
        'tracker_id': value.tracker_id,
        'created_at': value.created_at,
        'metadata': value.metadata,
        'messages': value.messages === undefined ? undefined : ((value.messages as Array<any>).map(MessageToJSON)),
        'status': value.status,
        'carrier_name': value.carrier_name,
        'carrier_id': value.carrier_id,
        'label': value.label,
        'tracking_number': value.tracking_number,
        'shipment_identifier': value.shipment_identifier,
        'selected_rate': RateToJSON(value.selected_rate),
        'meta': value.meta,
        'service': value.service,
        'selected_rate_id': value.selected_rate_id,
        'tracking_url': value.tracking_url,
        'test_mode': value.test_mode,
        'object_type': value.object_type,
    };
}

