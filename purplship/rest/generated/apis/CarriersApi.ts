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


import * as runtime from '../runtime';
import {
    CarrierList,
    CarrierListFromJSON,
    CarrierListToJSON,
    ErrorResponse,
    ErrorResponseFromJSON,
    ErrorResponseToJSON,
} from '../models';

export interface GetServicesRequest {
    carrierName: GetServicesCarrierNameEnum;
}

export interface ListRequest {
    limit?: number;
    offset?: number;
    carrierName?: ListCarrierNameEnum;
    test?: boolean | null;
    active?: boolean | null;
    systemOnly?: boolean | null;
}

/**
 * 
 */
export class CarriersApi extends runtime.BaseAPI {

    /**
     * Retrieve a carrier\'s services
     * Get carrier services
     */
    async getServicesRaw(requestParameters: GetServicesRequest, initOverrides?: RequestInit): Promise<runtime.ApiResponse<{ [key: string]: object; }>> {
        if (requestParameters.carrierName === null || requestParameters.carrierName === undefined) {
            throw new runtime.RequiredError('carrierName','Required parameter requestParameters.carrierName was null or undefined when calling getServices.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Token authentication
        }

        const response = await this.request({
            path: `/v1/carriers/{carrier_name}/services`.replace(`{${"carrier_name"}}`, encodeURIComponent(String(requestParameters.carrierName))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse<any>(response);
    }

    /**
     * Retrieve a carrier\'s services
     * Get carrier services
     */
    async getServices(requestParameters: GetServicesRequest, initOverrides?: RequestInit): Promise<{ [key: string]: object; }> {
        const response = await this.getServicesRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Returns the list of configured carriers
     * List all carriers
     */
    async listRaw(requestParameters: ListRequest, initOverrides?: RequestInit): Promise<runtime.ApiResponse<CarrierList>> {
        const queryParameters: any = {};

        if (requestParameters.limit !== undefined) {
            queryParameters['limit'] = requestParameters.limit;
        }

        if (requestParameters.offset !== undefined) {
            queryParameters['offset'] = requestParameters.offset;
        }

        if (requestParameters.carrierName !== undefined) {
            queryParameters['carrier_name'] = requestParameters.carrierName;
        }

        if (requestParameters.test !== undefined) {
            queryParameters['test'] = requestParameters.test;
        }

        if (requestParameters.active !== undefined) {
            queryParameters['active'] = requestParameters.active;
        }

        if (requestParameters.systemOnly !== undefined) {
            queryParameters['system_only'] = requestParameters.systemOnly;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Token authentication
        }

        const response = await this.request({
            path: `/v1/carriers`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => CarrierListFromJSON(jsonValue));
    }

    /**
     * Returns the list of configured carriers
     * List all carriers
     */
    async list(requestParameters: ListRequest, initOverrides?: RequestInit): Promise<CarrierList> {
        const response = await this.listRaw(requestParameters, initOverrides);
        return await response.value();
    }

}

/**
    * @export
    * @enum {string}
    */
export enum GetServicesCarrierNameEnum {
    Aramex = 'aramex',
    Australiapost = 'australiapost',
    Canadapost = 'canadapost',
    Canpar = 'canpar',
    DhlExpress = 'dhl_express',
    DhlPoland = 'dhl_poland',
    DhlUniversal = 'dhl_universal',
    Dicom = 'dicom',
    Eshipper = 'eshipper',
    Fedex = 'fedex',
    Freightcom = 'freightcom',
    Generic = 'generic',
    Purolator = 'purolator',
    Royalmail = 'royalmail',
    Sendle = 'sendle',
    SfExpress = 'sf_express',
    Tnt = 'tnt',
    Ups = 'ups',
    Usps = 'usps',
    UspsInternational = 'usps_international',
    Yanwen = 'yanwen',
    Yunexpress = 'yunexpress'
}
/**
    * @export
    * @enum {string}
    */
export enum ListCarrierNameEnum {
    Aramex = 'aramex',
    Australiapost = 'australiapost',
    Canadapost = 'canadapost',
    Canpar = 'canpar',
    DhlExpress = 'dhl_express',
    DhlPoland = 'dhl_poland',
    DhlUniversal = 'dhl_universal',
    Dicom = 'dicom',
    Eshipper = 'eshipper',
    Fedex = 'fedex',
    Freightcom = 'freightcom',
    Generic = 'generic',
    Purolator = 'purolator',
    Royalmail = 'royalmail',
    Sendle = 'sendle',
    SfExpress = 'sf_express',
    Tnt = 'tnt',
    Ups = 'ups',
    Usps = 'usps',
    UspsInternational = 'usps_international',
    Yanwen = 'yanwen',
    Yunexpress = 'yunexpress'
}
