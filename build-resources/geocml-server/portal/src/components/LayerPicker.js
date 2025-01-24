import { useSelector } from "react-redux";
import { useState } from "react";

export function LayerPicker(props) {
  const wfsLayers = useSelector((state) => state.app.wfsLayers);
  const wmsInfoValid = useSelector((state) => state.app.wmsInfoValid);
  const [selectedLayer, setSelectedLayer] = useState(undefined);
  const [selectedField, setSelectedField] = useState(undefined);


  if (wmsInfoValid) {
    if (wfsLayers.length > 0 && !selectedLayer) {
      setSelectedLayer(wfsLayers[0]);
      setSelectedField(Object.keys(wfsLayers[0].features[0].properties)[0]);
    }

    try {
        return (
          <div className="px-2 py-5">
            <h3 className="row justify-content-center">Layer Picker</h3>
            <select onChange={(e) => {
                setSelectedField(Object.keys(selectedLayer.features[0].properties)[0]);
                const foundLayer = wfsLayers.filter((layer) => layer.name === e.target.value)[0];
                setSelectedLayer(foundLayer);
            }}>
            {
                wfsLayers.length ? wfsLayers.map((layer) => {
                    return (
                        <option value={layer.name}>{layer.name}</option>
                    )
                }) : (<div></div>)
            }
            </select>

            <select onChange={(e) => {
                setSelectedField(e.target.value);
            }}>
            {
                selectedLayer ? Object.keys(selectedLayer.features[0].properties).map((field) => {
                    return (
                        <option value={field}>{field}</option>
                    )
                }) : (<div></div>)
            }
            </select>

        </div>
      )
    } catch (err) {
        console.log(err);
    }
  }
}
