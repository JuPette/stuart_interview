const router = require ('express').Router ()

router.route ('/:courier_id?')
.get (async (req, res) => {
    let { courier_id } = req.params;
    let { capacity } = req.query;

    if (courier_id && isNaN(courier_id)) return res.status(401).json({ error: 'Not valid courier_id required, should be integer' })

    try {
        let couriers = await models.courier.findAll ({
            where: {
                ...(courier_id && { id: courier_id / 1 } || {})
            },
            include: [
                {
                    model: models.vehicle,
                    as: 'vehicle',
                    where: {
                        ...(capacity && !isNaN(capacity / 1) && {
                            current_capacity_remaining: { [Op.gt]: capacity }
                        } || { })
                    }
                }
            ]
        })
        return res.json ({ couriers })
    } catch (error) {
        console.error (error)
        return res.status(400).json({ error })
    }
})
.put (async (req, res) => {
    if (!req.body) return res.status(401).json ('Missing body')
    try {
        let courier = await models.courier.create ({
            firstname: req.body.firstname || '',
            lastname: req.body.lastname || ''
        })
        return res.json({ courier })
    } catch (error) {
        return res.status(400).json({ error })
    }
})
.post (async (req, res) => {
    let { courier_id } = req.params;
    if (!courier_id || isNaN(courier_id / 1) ) return res.status(401).json({ error: 'Not valid courier_id'})
    let courier = await models.courier.findByPk(courier_id)
    let vehicle = await courier.getVehicle ()

    let { firstname, lastname, capacity } = req.body;
    if (firstname || lastname) {
        await courier.update({
            ...(firstname && { firstname } || { }),
            ...(lastname && { lastname } || {})
        })
    }
    if (capacity && !isNaN (capacity /1)) {
        await vehicle.update ({
            current_capacity: vehicle.current_capacity += capacity / 1
        })
    }

    return res.json ({ courier, vehicle })
})
.delete (async (req, res) => {
    let { courier_id } = req.params;
    if (!courier_id) return res.status(400).json({ error: 'Missing courier_id' })
    await models.courier.destroy({ where: {
        id: courier_id
    }})

    return res.json ({ message: 'Deleted' })
})

module.exports = router