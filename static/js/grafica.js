const chart = new Chart(document.getElementById('chartBar2').getContext('2d'), {
    type: 'line',
    data: {
        labels: [],
        datasets: []
    },
    options: {
        responsive: true,
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Hora'
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Temperatura (°C)'
                },
                beginAtZero: true
            }
        }
    }
});

function actualizarContenido() {
    fetch('/Graficas/')
        .then(response => response.json())
        .then(data => {
            const horas = data.grafica[Object.keys(data.grafica)[0]].map(d => d.hora);
            if (chart.data.labels.length === 0) {
                chart.data.labels = horas;
            }

            const colores = [
                { fondo: 'rgba(0, 191, 255, 0.15)', borde: 'rgba(0, 191, 255, 1)' },     // azul
                { fondo: 'rgba(255, 99, 132, 0.15)', borde: 'rgba(255, 99, 132, 1)' },     // rojo
                { fondo: 'rgba(75, 192, 192, 0.15)', borde: 'rgba(75, 192, 192, 1)' }      // verde agua
            ];

            Object.keys(data.grafica).forEach((noLinea, index) => {
                const temperaturas = data.grafica[noLinea].map(d => d.temperatura);

                let dataset = chart.data.datasets.find(ds => ds.label === `Linea ${noLinea}`);
                if (!dataset) {
                    const color = colores[index % colores.length];
                    dataset = {
                        label: `Linea ${noLinea}`,
                        data: temperaturas,
                        fill: true,
                        backgroundColor: color.fondo,
                        borderColor: color.borde,
                        tension: 0.4
                    };
                    chart.data.datasets.push(dataset);
                } else {
                    dataset.data = temperaturas;
                }
            });

            chart.update();

            const tbody = document.querySelector('#miTabla tbody');
            tbody.innerHTML = '';

            data.tabla.forEach(d => {
                const fila = document.createElement('tr');
                fila.innerHTML = `
                    <td><h6 class="fs-16 font-w600 mb-0"><a class="text-black">F-0000${d.Folio}</a></h6></td>
                    <td>
                        <h6 class="fs-16 font-w500 mb-0"><a class="text-black">Linea ${d.NoLinea}</a></h6>
                        <span class="fs-14 font-w400 ">Operador 16${d.Operador}4</span>
                    </td>
                    <td>
                        <h6 class="fs-16 text-black mb-0"><b class="font-w500">Inicial:</b> <span class="fs-14 font-w400">${d.TmpInicial} Seg</span></h6>
                        <h6 class="fs-16 text-black mb-0"><b class="font-w500">Tostado:</b> <span class="fs-14 font-w400">${d.TmpTostado} Seg</span></h6>
                    </td>
                    <td>
                        <h6 class="fs-16 text-black mb-0"><b class="font-w500">Enfirado:</b> <span class="fs-14 font-w400">${d.TmpEnfriado} Seg</span></h6>
                        <h6 class="fs-16 text-black mb-0"><b class="font-w500">Elevado:</b> <span class="fs-14 font-w400">${d.TmpoElevado} Seg</span></h6>
                    </td>
                    <td><span class="fs-16 text-black font-w400">${d.BatchVerde}</span></td>
                    <td><span class="fs-16 text-black font-w400">${d.CantAgua} Lts.</span></td>
                    <td><span class="fs-16 text-black font-w400">${d.TempCorte} °C</span></td>
                    <td><span class="fs-16 text-black font-w400">${d.PesoTostado} Kg.</span></td>
                    <td><span class="fs-16 text-black font-w400">${d.Destino}</span></td>
                    <td><h6 class="fs-16 text-black font-w400 mb-0">${d.FechaYHora}</h6></td>
                `;
                tbody.appendChild(fila);
            });
            const tbodyAgua = document.querySelector('#agua tbody');
            tbodyAgua.innerHTML = '';

            const aguaPorLinea = { 1: '-', 2: '-', 3: '-' };
            data.agua.forEach(item => {
                aguaPorLinea[item.NoLinea] = `${item.total_agua} Lts.`;
            });

            const filaAgua = document.createElement('tr');
            filaAgua.innerHTML = `
                                    <td><span class="fs-16 text-black font-w400 m-0 pt-0 pb-0">${aguaPorLinea[1]}</span></td>
                                    <td><span class="fs-16 text-black font-w400 m-0 pt-0 pb-0">${aguaPorLinea[2]}</span></td>
                                    <td><span class="fs-16 text-black font-w400 m-0 pt-0 pb-0">${aguaPorLinea[3]}</span></td>
                                `;
            tbodyAgua.appendChild(filaAgua);

            const tbodyPeso = document.querySelector('#peso tbody');
            tbodyPeso.innerHTML = '';

            const pesoPorLinea = { 1: '-', 2: '-', 3: '-' };
            data.peso.forEach(item => {
                pesoPorLinea[item.NoLinea] = `${item.total_cafe} Kg.`;
            });

            const filaPeso = document.createElement('tr');
            filaPeso.innerHTML = `
                                    <td><span class="fs-16 text-black font-w400 m-0 pt-0 pb-0">${pesoPorLinea[1]}</span></td>
                                    <td><span class="fs-16 text-black font-w400 m-0 pt-0 pb-0">${pesoPorLinea[2]}</span></td>
                                    <td><span class="fs-16 text-black font-w400 m-0 pt-0 pb-0">${pesoPorLinea[3]}</span></td>
                                `;
            tbodyPeso.appendChild(filaPeso);

            const tbodyBatch = document.querySelector('#batch tbody');
            tbodyBatch.innerHTML = '';

            const batchPorLinea = { 1: '-', 2: '-', 3: '-' };
            data.batch.forEach(item => {
                batchPorLinea[item.NoLinea] = `${item.total_batch} Kg.`;
            });

            const filaBatch = document.createElement('tr');
            filaBatch.innerHTML = `
                                    <td><span class="fs-16 text-black font-w400  m-0 pt-0 pb-0">${batchPorLinea[1]}</span></td>
                                    <td><span class="fs-16 text-black font-w400  m-0 pt-0 pb-0">${batchPorLinea[2]}</span></td>
                                    <td><span class="fs-16 text-black font-w400  m-0 pt-0 pb-0">${batchPorLinea[3]}</span></td>
                                `;
            tbodyBatch.appendChild(filaBatch);


        })
        .catch(error => console.error('Error al actualizar datos:', error));
}

setInterval(actualizarContenido, 5000);
actualizarContenido();
