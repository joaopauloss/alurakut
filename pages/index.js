// import styled from 'styled-components'
import React from 'react';
import MainGrid from '../src/components/MainGrid'
import Box from '../src/components/Box'
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons.js'
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRealations';

function ProfileSidebar(properties) {
  console.log(properties);
  return (
    <Box as="aside">
      <img src={`https://github.com/${properties.githubUser}.png`} style={{ borderRadius: "8px"}} />
      <hr />
        <p>
          <a className="boxLink" href={`https://github.com/${properties.githubUser}`}>
            @{properties.githubUser}
          </a>
        </p>
      <hr />

      <AlurakutProfileSidebarMenuDefault />
    </Box>
  )
}

function ProfileRelationsBox(prop) {
  return (
    <ProfileRelationsBoxWrapper>
      <h2 className="smallTitle">
        {prop.title} ({prop.items.length})
      </h2>

      <ul>
        {/* {seguidores.map((itemAtual) => {
          return (
            <li key={itemAtual}>
              <a href={`https://github.com/${itemAtual}`} key={itemAtual}>
                <img src={`https://github.com/${itemAtual}.png`} />
                <span>{itemAtual}</span>
              </a>
            </li>
          )
        })} */}
      </ul>
    </ProfileRelationsBoxWrapper>
  )
}



export default function Home() {
  const usuarioAleatorio = 'joaopauloss';
  const [comunidades, setComunidades] = React.useState([]); /** hooks */
  // const comunidades = comunidades[0];
  // const alteradorDeComunidaes/setComunidades = comunidades[1];

  console.log(comunidades);
  
  const pessoasFavoritas = [
    'juunegreiros',
    'omariosouto',
    'peas',
    'rafaballerini'
  ]

  const [seguidores, setSeguidores] = React.useState([]);

  // 0 - Pegar o array de dados do github

  React.useEffect(function () { //intereptador de qualquer evento no react
    fetch('https://api.github.com/users/peas/followers')
    .then(function (respostaDoServidor) {
      return respostaDoServidor.json();
    })
    .then(function (respostaCompleta) {
      setSeguidores(respostaCompleta);
    })

    // API GraphQL
    fetch('https://graphql.datocms.com/', {
      method: 'POST',
      headers: {
        'Authorization': '18962c15817e8b0f53b3af67241f69',
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ "query": `query {
                                        allCommunities {
                                          title
                                          id
                                          imageUrl
                                          creatorSlug
                                        }
                                      }` })
      })
      .then((response) => response.json()) // same as: 
                                                  // .then(function () {
                                                  //   return response.json();
                                                  // })
      .then((respostaCompleta) => {
        const comunidadesVindasDoDato = respostaCompleta.data.allCommunities
        console.log(respostaCompleta);
        setComunidades(comunidadesVindasDoDato);
      })
  }, []) //array que mostrando que deve ser executado. Se for vazio, será executando apenas uma vez.


  // 1 - Criar um box que vai ter um map, baseado nos items do array do github

  return (
    <>
    <AlurakutMenu />
    <MainGrid>
      <div className="profileArea" style={{ gridArea: 'profileArea' }}>  {/* React uses className instead of class */}
       <ProfileSidebar githubUser = {usuarioAleatorio}/>
      </div>
      <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
        <Box >
          <h1 className="title">
            Bem vindo (a)
          </h1>
          <OrkutNostalgicIconSet/>
        </Box>
        
        <Box>
          <h2 className="subTitle">O que você deseja fazer ?</h2>
          <form onSubmit={function handleCreateComunity(event) {
              event.preventDefault(); /** disable the page's refresh when submit the button or change pages via some link */
              const dadosDoForm = new FormData(event.target);

              console.log('Campo: ', dadosDoForm.get('title'));
              console.log('Campo: ', dadosDoForm.get('image'));

              const comunidade = {
                title: dadosDoForm.get('title'),
                imageUrl: dadosDoForm.get('image'),
                creatorSlug: usuarioAleatorio
              }

              fetch('/api/comunidades', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(comunidade)
              })
              .then(async (response) => {
                const dados = await response.json();
                console.log(dados.registroCriado);
                const comunidade = dados.registroCriado;
                const comunidadesAtualizadas = [...comunidades, comunidade];
                setComunidades(comunidadesAtualizadas);
              })
              
              console.log(comunidades);

          }}>
            <div>
              <input placeholder="Qual vai ser o nome da sua comunidade ?" name="title" aria-label="Qual vai ser o nome da sua comunidade ?" type="text" />
            </div>
            <div>
              <input placeholder="Coloque uma URL para usarmos de capa" name="image" aria-label="Coloque uma URL para usarmos de capa" />
            </div>
            <button>
              Criar comunidade
            </button>
          </form>
        </Box>
      </div>
      <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>
        <ProfileRelationsBox title="Seguidores" items={seguidores} />
        <ProfileRelationsBoxWrapper>
          <h2 className="smallTitle">
              Comunidades ({comunidades.length})
          </h2>
          <ul>
            {comunidades.map((itemAtual) => {
              return (
                <li key={itemAtual.id}>
                  <a href={`/communities/${itemAtual.title}`} key={itemAtual.id}>
                    <img src={itemAtual.imageUrl} />
                    <span>{itemAtual.title}</span>
                  </a>
                </li>
              )
            })}
          </ul>
        </ProfileRelationsBoxWrapper>
        <ProfileRelationsBoxWrapper>
          <h2 className="smallTitle">
            Pessoas da Comunidades ({pessoasFavoritas.length})
          </h2>

          <ul>
            {pessoasFavoritas.map((itemAtual) => {
              return (
                <li key={itemAtual}>
                  <a href={`/users/${itemAtual}`} key={itemAtual}>
                    <img src={`https://github.com/${itemAtual}.png`} />
                    <span>{itemAtual}</span>
                  </a>
                </li>
              )
            })}
          </ul>

        </ProfileRelationsBoxWrapper>
      </div>
    </MainGrid>
    </>
  )
}
