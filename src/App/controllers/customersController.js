let customers = [
    { id: 1, name: "Matheus" }
]

class CustomersControllers {
    index(req, res) {
        return res.json(customers);
    }

    show(req, res) {
        const id = parseInt(req.params.id);
        const customer = customers.find(item => item.id === id);
        const status = customer ? 200 : 404;

        return res.status(status).json(customer);
    }

    create(req, res) {
        const id = customers[customers.length - 1].id + 1;
        const { name } = req.body;

        const newCustomer = { id, name };
        customers.push(newCustomer);

        return res.status(201).json(newCustomer);
    }

    update(req, res) {
        const id = parseInt(req.params.id);
        const { name } = req.body;

        const index = customers.findIndex(item => item.id === id);
        const status = index >= 0 ? 200 : 404;

        if (index >= 0) {
            customers[index] = { id: parseInt(id), name };
        }

        return res.status(status).json(customers[index]);
    }

    destroy(req, res) {
        const id = parseInt(req.params.id);

        const index = customers.findIndex(item => item.id === id);
        const status = index >= 0 ? 200 : 404;

        if (index >= 0) {
            customers.splice(index, 1)
        }

        return res.status(status).json({message: "APAGADO"});   
    }
}

module.exports = new CustomersControllers();