import faker from 'faker'
import niceColors from 'nice-color-palettes'
faker.seed(1)

const colors = [
    ...niceColors[1].slice(1, niceColors[1].length),
    ...niceColors[55].slice(0, 3),
]

const data = [
    {
        image: 'https://cdn-icons-png.flaticon.com/512/5463/5463636.png'
    },
    {
        image: 'https://cdn-icons-png.flaticon.com/512/5463/5463670.png'
    },
    {
        image: 'https://cdn-icons-png.flaticon.com/512/5463/5463680.png'
    }
]

export const detailsIcons = [
    { color: '#9FD7F1', icon: 'isv' },
    { color: '#9FD7F1', icon: 'Trophy' },
    { color: '#9FD7F1', icon: 'edit' },
]

export default data.map((item, index) => ({
    ...item,
    key: faker.datatype.uuid(),
    color: colors[index % colors.length],
    name: faker.name.findName(),
    jobTitle: faker.name.jobTitle(),
    categories: [...Array(3).keys()].map(() => {
        return {
            key: faker.datatype.uuid(),
            title: faker.name.jobType(),
            subcats: [...Array(3).keys()].map(faker.name.jobType)
        }
    })
}))