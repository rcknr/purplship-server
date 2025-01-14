import AuthenticatedPage from "@/layouts/authenticated-page";
import CopiableLink from "@/components/copiable-link";
import DashboardLayout from "@/layouts/dashboard-layout";
import { Loading } from "@/components/loader";
import StatusBadge from "@/components/status-badge";
import OrderProvider, { Order } from "@/context/order-provider";
import { formatAddressLocation, formatDateTime, isNone, formatCommodity, formatDateTimeLong } from "@/lib/helper";
import { useRouter } from "next/dist/client/router";
import Head from "next/head";
import React, { useContext, useEffect } from "react";
import AppLink from "@/components/app-link";
import { MetadataObjectType } from "@purplship/graphql";
import MetadataMutationProvider from "@/context/metadata-mutation";
import MetadataEditor, { MetadataEditorContext } from "@/components/metadata-editor";
import Spinner from "@/components/spinner";
import EventsProvider, { EventsContext } from "@/context/events-provider";
import LogsProvider, { LogsContext } from "@/context/logs-provider";
import StatusCode from "@/components/status-code-badge";

export { getServerSideProps } from "@/lib/middleware";


export const OrderComponent: React.FC<{ orderId?: string }> = ({ orderId }) => {
  const router = useRouter();
  const logs = useContext(LogsContext);
  const events = useContext(EventsContext);
  const { setLoading } = useContext(Loading);
  const { order, loading, called, loadOrder } = useContext(Order);
  const { id } = router.query;

  useEffect(() => { setLoading(loading); });
  useEffect(() => {
    (!loading && loadOrder) && loadOrder((id || orderId) as string);
  }, [id || orderId]);
  useEffect(() => {
    if (called && !isNone(order)) {
      (!logs.called && !logs.loading && logs.load) && logs.load({ entity_id: order?.id });
      (!events.called && !events.loading && events.load) && events.load({ entity_id: order?.id });
    }
  }, [called, order]);

  return (
    <>

      {loading && <Spinner />}

      {!loading && order && <>

        {/* Header section */}
        <div className="columns my-1">
          <div className="column is-6">
            <span className="subtitle is-size-7 has-text-weight-semibold">ORDER</span>
            <br />
            <span className="title is-4 mr-2">{order.order_id}</span>
            <StatusBadge status={order.status} />
          </div>

          <div className="column is-6 has-text-right pb-0">
            <CopiableLink text={order.id as string} title="Copy ID" />
            <br />
            {!isNone(orderId) &&
              <AppLink
                href={`/orders/${orderId}`} target="blank"
                className="button is-default has-text-info is-small mx-1">
                <span className="icon">
                  <i className="fas fa-external-link-alt"></i>
                </span>
              </AppLink>}
          </div>
        </div>

        {/* Reference and highlights section */}
        <hr className="mt-1 mb-2" style={{ height: '1px' }} />

        <div className="columns mb-4">
          <div className="p-4 mr-4">
            <span className="subtitle is-size-7 my-4">Date</span><br />
            <span className="subtitle is-size-7 mt-1 has-text-weight-semibold">{formatDateTime(order.created_at)}</span>
          </div>

          {!isNone(order.source) && <>
            <div className="my-2" style={{ width: '1px', backgroundColor: '#ddd' }}></div>
            <div className="p-4 mr-4">
              <span className="subtitle is-size-7 my-4">Source</span><br />
              <span className="subtitle is-size-7 has-text-weight-semibold">{order.source}</span>
            </div>
          </>}
        </div>


        <h2 className="title is-5 my-5">Order Details</h2>
        <hr className="mt-1 mb-2" style={{ height: '1px' }} />

        <div className="mt-3 mb-6">

          {/* address and line items section */}
          <div className="columns my-0 is-multiline">
            {/* Shipping Address section */}
            <div className="column is-6 is-size-6 py-1">
              <p className="is-title is-size-6 my-2 has-text-weight-semibold">ADDRESS</p>

              <p className="is-size-6 my-1">{order.shipping_address.person_name}</p>
              <p className="is-size-6 my-1">{order.shipping_address.company_name}</p>
              <p className="is-size-6 my-1 has-text-info">{order.shipping_address.email}</p>
              <p className="is-size-6 my-1 has-text-info">{order.shipping_address.phone_number}</p>
              <p className="is-size-6 my-1">
                <span>{order.shipping_address.address_line1}</span>
                {!isNone(order.shipping_address.address_line2) && <span>{order.shipping_address.address_line2}</span>}
              </p>
              <p className="is-size-6 my-1">{formatAddressLocation(order.shipping_address)}</p>
            </div>

            {/* Line Items section */}
            <div className="column is-6 is-size-6 py-1">
              <p className="is-title is-size-6 my-2 has-text-weight-semibold">LINE ITEMS</p>

              {order.line_items.map((item, index) => <React.Fragment key={index + "parcel-info"}>
                <hr className="mt-1 mb-2" style={{ height: '1px' }} />
                <p className="is-size-7 my-1">{formatCommodity(item as any, index)}</p>
              </React.Fragment>)}
            </div>
          </div>

          {/* Options section */}
          <div className="columns mt-6 mb-0 is-multiline">
            {(Object.values(order.options as object).length > 0) && <div className="column is-6 is-size-6 py-1">
              <p className="is-title is-size-6 my-2 has-text-weight-semibold">ORDER OPTIONS</p>

              {Object.entries(order.options).map(([key, value]: any, index) => <React.Fragment key={index + "item-info"}>
                <p className="is-subtitle is-size-7 my-1 has-text-weight-semibold has-text-grey">
                  <span>{key}: <strong>{value}</strong></span>
                </p>
              </React.Fragment>)}

            </div>}
          </div>

        </div>

        {/* Metadata section */}
        <MetadataEditor
          id={order.id}
          object_type={MetadataObjectType.order}
          metadata={order.metadata}
          onChange={() => loadOrder(order.id)}
        >
          <MetadataEditorContext.Consumer>{({ isEditing, editMetadata }) => (<>

            <div className="is-flex is-justify-content-space-between">
              <h2 className="title is-5 my-4">Metadata</h2>

              <button
                type="button"
                className="button is-default is-small is-align-self-center"
                disabled={isEditing}
                onClick={() => editMetadata()}>
                <span className="icon is-small">
                  <i className="fas fa-pen"></i>
                </span>
                <span>Edit metadata</span>
              </button>
            </div>

            <hr className="mt-1 mb-2" style={{ height: '1px' }} />

          </>)}</MetadataEditorContext.Consumer>
        </MetadataEditor>

        <div className="my-6 pt-1"></div>

        {/* Shipments section */}
        <h2 className="title is-5 my-4">Shipments</h2>

        {(order.shipments || []).length == 0 && <div>No shipments</div>}

        {(order.shipments || []).length > 0 && <div className="table-container">
          <table className="related-item-table table is-hoverable is-fullwidth">
            <tbody>
              {(order.shipments || []).map(shipment => (
                <tr key={shipment.id} className="items is-clickable">
                  <td className="status is-vcentered p-0">
                    <AppLink href={`/shipments/${shipment.id}`} className="pr-2">
                      <StatusBadge status={shipment.status as string} style={{ width: '80%' }} />
                    </AppLink>
                  </td>
                  <td className="description is-vcentered p-0">
                    <AppLink href={`/shipments/${shipment.id}`} className="is-size-7 has-text-weight-semibold has-text-grey is-flex py-3">
                      {shipment.id}{' '}{shipment.tracking_number && <strong> - {shipment.tracking_number}</strong>}
                    </AppLink>
                  </td>
                  <td className="date is-vcentered p-0">
                    <AppLink href={`/shipments/${shipment.id}`} className="is-size-7 has-text-weight-semibold has-text-grey is-flex is-justify-content-right py-3">
                      <span>{formatDateTime(shipment.created_at)}</span>
                    </AppLink>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>}

        <div className="my-6 pt-1"></div>

        {/* Logs section */}
        <h2 className="title is-5 my-4">Logs</h2>

        {logs.loading && <Spinner />}

        {!logs.loading && (logs.logs || []).length == 0 && <div>No logs</div>}

        {!logs.loading && (logs.logs || []).length > 0 && <div className="table-container">
          <table className="related-item-table table is-hoverable is-fullwidth">
            <tbody>
              {(logs.logs || []).map(log => (
                <tr key={log.id} className="items is-clickable">
                  <td className="status is-vcentered p-0">
                    <AppLink href={`/developers/logs/${log.id}`} className="pr-2">
                      <StatusCode code={log.status_code as number} />
                    </AppLink>
                  </td>
                  <td className="description is-vcentered p-0">
                    <AppLink href={`/developers/logs/${log.id}`} className="is-size-7 has-text-weight-semibold has-text-grey is-flex py-3">
                      {`${log.method} ${log.path}`}
                    </AppLink>
                  </td>
                  <td className="date is-vcentered p-0">
                    <AppLink href={`/developers/logs/${log.id}`} className="is-size-7 has-text-weight-semibold has-text-grey is-flex is-justify-content-right py-3">
                      <span>{formatDateTimeLong(log.requested_at)}</span>
                    </AppLink>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>}

        <div className="my-6 pt-1"></div>

        {/* Events section */}
        <h2 className="title is-5 my-4">Events</h2>

        {events.loading && <Spinner />}

        {!events.loading && (events.events || []).length == 0 && <div>No events</div>}

        {!events.loading && (events.events || []).length > 0 && <div className="table-container">
          <table className="related-item-table table is-hoverable is-fullwidth">
            <tbody>
              {(events.events || []).map(event => (
                <tr key={event.id} className="items is-clickable">
                  <td className="description is-vcentered p-0">
                    <AppLink href={`/developers/events/${event.id}`} className="is-size-7 has-text-weight-semibold has-text-grey is-flex py-3">
                      {`${event.type}`}
                    </AppLink>
                  </td>
                  <td className="date is-vcentered p-0">
                    <AppLink href={`/developers/events/${event.id}`} className="is-size-7 has-text-weight-semibold has-text-grey is-flex is-justify-content-right py-3">
                      <span>{formatDateTimeLong(event.created_at)}</span>
                    </AppLink>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>}

      </>}

      {called && !loading && isNone(order) && <div className="card my-6">

        <div className="card-content has-text-centered">
          <p>Uh Oh!</p>
          <p>{"We couldn't find any order with that reference"}</p>
        </div>

      </div>}
    </>
  );
};

export default function OrderPage(pageProps: any) {
  return AuthenticatedPage((
    <DashboardLayout>
      <Head><title>Order - {(pageProps as any).metadata?.APP_NAME}</title></Head>
      <OrderProvider>
        <EventsProvider setVariablesToURL={false}>
          <LogsProvider setVariablesToURL={false}>
            <MetadataMutationProvider>

              <OrderComponent />

            </MetadataMutationProvider>
          </LogsProvider>
        </EventsProvider>
      </OrderProvider>
    </DashboardLayout>
  ), pageProps);
}
