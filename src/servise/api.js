const API_URL = 'https://t-core.fit-hub.pro/Test/GetTariffs'

export const fetchTarifs = async () => {
    try {
        const response = await fetch(API_URL, {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        });
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }
        const parseJson = (str) => {
            if (typeof str !== 'string') return str;
            
            try {
                const parsed = JSON.parse(str);
                return parseJson(parsed)
            } catch {
                return str;
            }
        };
        
        const text = await response.text();
        const data = parseJson(text);

        return data 
        
    } catch (error) {
        throw error;
    }
};