import Plot from "react-plotly.js";

function PriceHistoryChart({ stock }) {
    // Mapeia os preços e datas do histórico
    const prices = stock.history.map(record => record.price);
    const dates = stock.history.map(record =>
        new Date(record.history_date).toISOString().slice(0, 19).replace("T", " ")
    );

    // Dados do gráfico
    const data = [
        {
            x: dates,
            y: prices,
            mode: "lines+markers",
            type: "scatter",
            marker: { size: 8 },
        },
    ];

    // Layout do gráfico
    const layout = {
        yaxis: { title: "Preço" },
        margin: { t: 20, b: 40, l: 60, r: 30 },
    };

    return (
        <div className="price-history-chart">
            <Plot data={data} layout={layout} style={{ width: "100%", height: "100%" }} />
        </div>
    );
}

export default PriceHistoryChart;