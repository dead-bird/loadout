export default (instance, id) =>
  new Promise((resolve, reject) => {
    instance(url(id), { params: { l: 'english', count: 5000 } })
      .then(({ data: { descriptions } }) => {
        resolve(sortData(descriptions || []));
      })
      .catch(e => reject(e));
  });

function url(id) {
  return `https://steamcommunity.com/inventory/${id}/730/2`;
}

function category(item, name) {
  return item.tags.find(t => t.category === name).localized_tag_name;
}

function sortData(items) {
  return items
    .filter(({ tags }) => tags.some(t => t.category === 'Weapon'))
    .map(i => {
      const kills = i.descriptions.reduce((total, item) => {
        const regex = /StatTrak™ Confirmed Kills: (.*)/i;
        const [match, kills] = item.value.match(regex) || [];

        if (kills || false) {
          total = parseInt(kills);
        }

        return total;
      }, 0);

      return {
        ...i,
        kills,
        skin: i.name.replace(/.*\| (.*)/, '$1'),
        type: category(i, 'Type'),
        wear: category(i, 'Exterior'),
        weapon: category(i, 'Weapon'),
        statTrak: category(i, 'Quality') === 'StatTrak™',
      };
    })
    .sort((a, b) => {
      // Sort by weapon type
      if (a.type > b.type) return 1;
      if (a.type < b.type) return -1;

      // Sort by weapon
      if (a.weapon > b.weapon) return 1;
      if (a.weapon < b.weapon) return -1;
    });
}
