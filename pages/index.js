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
              <a href={`https://github.com/${itemAtual.}`} key={itemAtual}>
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
  const [comunidades, setComunidades] = React.useState([{
    id: '213435235623465463463456345',
    title: 'Eu odeio acordar cedo',
    image: 'https://alurakut.vercel.app/capa-comunidade-01.jpg'
  }]); /** hooks */
  // const comunidades = comunidades[0];
  // const alteradorDeComunidaes/setComunidades = comunidades[1];

  console.log(comunidades);
  
  const pessoasFavoritas = [
    'juunegreiros',
    'omariosouto',
    'peas',
    'rafaballerini', 
    'erodac',
    'PauloMarvin'
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
                id: new Date().toISOString(),
                title: dadosDoForm.get('title'),
                image: dadosDoForm.get('image'),
              }
              // comunidades.push('Alura Stars');
              const comunidadesAtualizadas = [...comunidades, comunidade];

              setComunidades(comunidadesAtualizadas);
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
                  <a href={`/users/${itemAtual.title}`} key={itemAtual.title}>
                    <img src={itemAtual.image} />
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
