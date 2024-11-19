const filter = (array, filters) =>  {
    return array.filter(apt => {
        for (const [key, value] of Object.entries(filters)) {
            if (typeof apt[key] === 'string' && typeof value === 'string') {
                if (!apt[key].toLowerCase().includes(value.toLowerCase())) {
                    return false;
                }
            }
            else if (apt[key] !== value) {
                return false;
            }
        }
        return true;
    });
}

module.exports = filter