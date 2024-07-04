const apiUrl = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false';

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => renderTable(data));

        async function fetchData() {
            try {
                const response = await fetch(apiUrl);
                const data = await response.json();
                renderTable(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        function renderTable(data) {
            const tableBody = document.getElementById('cryptoData');
            tableBody.innerHTML = '';

            data.forEach(item => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${item.name}</td>
                    <td>${item.symbol.toUpperCase()}</td>
                    <td>${item.current_price}</td>
                    <td>${item.total_volume}</td>
                `;
                tableBody.appendChild(row);
            });
        }

        function filterData() {
            const searchInput = document.getElementById('searchInput').value.toLowerCase();
            const rows = document.querySelectorAll('#cryptoData tr');

            rows.forEach(row => {
                const name = row.querySelector('td:first-child').textContent.toLowerCase();
                const symbol = row.querySelector('td:nth-child(2)').textContent.toLowerCase();
                row.style.display = name.includes(searchInput) || symbol.includes(searchInput) ? '' : 'none';
            });
        }

        function sortData(key) {
            const rows = Array.from(document.querySelectorAll('#cryptoData tr'));
            rows.sort((a, b) => {
                const aValue = parseFloat(a.querySelector(`td:nth-child(${key === 'market_cap' ? 4 : 5})`).textContent);
                const bValue = parseFloat(b.querySelector(`td:nth-child(${key === 'market_cap' ? 4 : 5})`).textContent);
                return key === 'market_cap' ? bValue - aValue : aValue - bValue;
            });

            const tableBody = document.getElementById('cryptoData');
            tableBody.innerHTML = '';
            rows.forEach(row => tableBody.appendChild(row));
        }

        // Initial data fetch
        fetchData();