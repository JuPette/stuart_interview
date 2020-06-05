const router = require ('express').Router ();

router.route ('/:vehicle_id?')
.get (async (req, res) => {
    let { vehicle_id } = req.params;

    if (vehicle_id && isNaN(vehicle_id)) return res.status(401).json({ error: 'Not valid vehicle_id required, should be integer' })

    try {
        let vehicles = await models.vehicle.findAll ({
            where: {
                ...(vehicle_id && { id: vehicle_id / 1 } || {})
            },
            include: [
                {
                    model: models.courier
                }
            ]
        })
        return res.json ({ vehicles })
    } catch (error) {
        console.error (error)
        return res.status(400).json({ error })
    }
})
.put (async (req, res) => {
    if (!req.body) return res.status(401).json ('Missing body')
    let { max_capacity, courierId } = req.body;
    let owner = await models.courier.findByPk (courierId)
    try {
        if (owner) await owner.setVehicle (null) //Add to had this because of unwanted duplicates creation of couriers with the same id... It is one thing I would investigate with more time
        let vehicle = await models.vehicle.create ({
            max_capacity,
            current_capacity_remaining: max_capacity,
            courierId
        })
        return res.json({ vehicle })
    } catch (error) {
        return res.status(400).json({ error })
    }
})
.post (async (req, res) => {
    let { vehicle_id } = req.params;
    let { capacity } = req.body;


    if ((!capacity || isNaN(capacity / 1)) || !vehicle_id || isNaN(vehicle_id)) {
        return res.status(401).json({ error: 'Missing body or correct vehicle_id' })
    }

    let vehicle = await models.vehicle.findByPk (vehicle_id)
    if (!vehicle) return res.status(400).json({ error: 'Vehicle not found' })

    let vehicle_updated = await vehicle.update_capacity ({ capacity })

    return res.json({ message: `Vehicle [${vehicle.id}], capacity has been updated correctlty -> ${vehicle_updated.current_capacity_remaining}`})
})
.delete (async (req, res) => {
    let { vehicle_id } = req.params;
    if (!vehicle_id) return res.status(400).json({ error: 'Missing vehicle_id' })
    await models.vehicle.destroy({ where: {
        id: vehicle_id
    }})

    return res.json ({ message: 'Deleted' })
})

module.exports = router;