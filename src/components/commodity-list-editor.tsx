import React, { useEffect } from 'react';
import { CommodityType } from '@/lib/types';
import CommodityDescription from '@/components/descriptions/commodity-description';
import { deepEqual, isNoneOrEmpty } from '@/lib/helper';
import CommodityEditModalProvider, { CommodityStateContext } from '@/components/commodity-edit-modal';

type CommodityCollection = Record<string, CommodityType>;
interface CommodityCollectionEditorProps {
  className?: string;
  style?: React.CSSProperties;
  defaultValue?: CommodityType[];
  onRemove?: (id: string) => Promise<any>;
  onChange?: (commodities: CommodityType[]) => void;
}
interface CommodityCollectionEditorInterface {
  isExpanded: boolean;
  commodities: CommodityType[];
}

export const CommodityCollectionEditorContext = React.createContext<CommodityCollectionEditorInterface>({
  isExpanded: false,
  commodities: [],
} as CommodityCollectionEditorInterface);

const CommodityCollectionEditor: React.FC<CommodityCollectionEditorProps> = ({ defaultValue, children, className, onChange, onRemove, ...props }) => {
  const [isExpanded, setIsExpanded] = React.useState<boolean>(false);
  const [commodities, setCommodities] = React.useState<CommodityCollection>(toCommodityCollection(defaultValue));

  const updateCommodity = (uid: string, data: CommodityType) => {
    const newState = { ...commodities, [uid]: data };
    setCommodities(newState);
  };
  const removeCommodity = async (uid: string) => {
    const { id } = commodities[uid];
    id && onRemove && await onRemove(id);
    const newState = Object
      .entries(commodities)
      .reduce((acc, [key, item]) => (key === uid ? acc : { ...acc, [key]: item }), {});

    setCommodities(newState);
  };

  useEffect(() => {
    if (onChange && !deepEqual(toCommodityCollection(defaultValue), commodities)) {
      onChange(Object.values(commodities));
    }
  }, [commodities]);

  return (
    <article className={`panel is-shadowless ${className || 'is-white my-3'}`} {...props}>
      <CommodityEditModalProvider>
        <CommodityCollectionEditorContext.Provider value={{ isExpanded, commodities: Object.values(commodities) }}>

          <div className="p-2" onClick={() => setIsExpanded(!isExpanded)}>
            {children}
          </div>

          {isExpanded && <CommodityStateContext.Consumer>{({ editCommodity }) => (<>

            {Object.entries(commodities).map(([uid, commodity]) => (
              <div key={uid} className="panel-block is-justify-content-space-between">
                <CommodityDescription commodity={commodity} />
                <div className="buttons">
                  <button type="button" className="button is-small is-white"
                    onClick={e => {
                      e.preventDefault();
                      editCommodity({ commodity, onChange: async changes => updateCommodity(uid, changes) });
                      return false;
                    }}>
                    <span className="icon is-small"><i className="fas fa-pen"></i></span>
                  </button>
                  <button type="button" className="button is-small is-white"
                    onClick={e => { e.preventDefault(); removeCommodity(uid); return false; }}>
                    <span className="icon is-small"><i className="fas fa-trash"></i></span>
                  </button>
                </div>
              </div>
            ))}

            <div className="panel-block is-justify-content-space-between p-0" style={{ border: 'transparent' }}>
              <button
                type="button"
                className="button is-white is-small has-text-primary"
                onClick={() => editCommodity({
                  onChange: async data => updateCommodity(`commodity-${Date.now()}`, data)
                })}>
                <span className="icon is-small">
                  <i className="fas fa-plus"></i>
                </span>
                <span>Add another item</span>
              </button>
            </div>

          </>)}</CommodityStateContext.Consumer>}

        </CommodityCollectionEditorContext.Provider>
      </CommodityEditModalProvider>
    </article>
  );
};

function toCommodityCollection(commodities?: CommodityType[]): CommodityCollection {
  return (commodities || []).reduce((acc, commodity, index) => {
    return { ...acc, [`commodity-${index}-${Date.now()}`]: commodity };
  }, {});
}

export default CommodityCollectionEditor;
