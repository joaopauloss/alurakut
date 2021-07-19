import { SiteClient } from 'datocms-client';

export default async function recebedorDeRequests(request, response) {
    if (request.method === 'POST') {
        const TOKEN = '8589eb2c8e912333452cc317771cac';
        const client = new SiteClient(TOKEN);

        const registroCriado = await client.items.create({
            itemType: "979437", // ID do model de "communities" criado pelo Dato
            ...request.body,
            // title:"Comunidade de teste",
            // imageUrl: "https://github.com/joaopauloss.png",
            // creatorSlug: "joaopauloss"
        })

        console.log(registroCriado);

        console.log(TOKEN); // não vai mostrar no console do devtools do navegador, apenas no terminal
        
        response.json({
            dados: "Um dado qualquer",
            registroCriado: registroCriado
        })
        return;
    }

    response.status(404).json({
        message: 'Ainda não temos nada no GET, mas no POST tem !'
    })
}