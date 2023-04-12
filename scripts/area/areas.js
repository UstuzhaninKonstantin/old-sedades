export const areas = [
    {
        name: 'Area 1',
        fullZone: {x: 0, y: 0, w: 1000, h: 600, c: '#200040'},
        enemiesZone: {x: 200, y: 0, w: 600, h: 600, c: '#000000'},
        enemies: [
            {
                type: "BasicEnemy",
                amount: 5,
                speed: 7,
                r: 18
            },

            {
                type: "BorderEnemy",
                amount: 1,
                speed: 5,
                r: 18
            },

            {
                type: "RedAuraEnemy",
                amount: 2,
                speed: 5,
                r: 85
            }
        ],
    },
    
    {
        name: 'Area 2',
        fullZone: {x: 0, y: 0, w: 1000, h: 600, c: '#200040'},
        enemiesZone: {x: 200, y: 0, w: 600, h: 600, c: '#000000'},
        enemies: [
            {
                type: "BasicEnemy",
                amount: 8,
                speed: 7,
                r: 18
            },

            {
                type: "BorderEnemy",
                amount: 1,
                speed: 5,
                r: 18
            },

            {
                type: "RedAuraEnemy",
                amount: 5,
                speed: 5,
                r: 85
            }
        ]
    },

    {
        name: 'Area 3',
        fullZone: {x: 0, y: 0, w: 1000, h: 600, c: '#200040'},
        enemiesZone: {x: 200, y: 0, w: 600, h: 600, c: '#000000'},
        enemies: [
            {
                type: "BasicEnemy",
                amount: 10,
                speed: 7,
                r: 18
            },

            {
                type: "BorderEnemy",
                amount: 1,
                speed: 5,
                r: 18
            },

            {
                type: "RedAuraEnemy",
                amount: 7,
                speed: 5,
                r: 85
            }
        ]
    }
]