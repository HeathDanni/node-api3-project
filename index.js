//code away!
const server = require('./server')

const port = 4000

server.listen(port, () => {
	console.log(`server is running at port ${port}`)
})
