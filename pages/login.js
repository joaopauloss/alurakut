import React from 'react';
// Hook do NextJS
import { useRouter } from 'next/router';
import nookies from 'nookies';

export default function LoginScreen() {
    const router = useRouter();
    const [githubUser, setGithubUser] = React.useState('');
    return (
        <main style={{ display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <div className="loginScreen">
            <section className="logoArea">
            <img src="logo.svg" />

            <p>Usando recados e mensagens instantâneas aos seus amigos e familiares <strong>Conecte-se</strong></p>
            <p>Através de amigos de seus amigos e comunidades novas pessoas <strong>Conheça</strong></p>
            <p>Em um só lugar seus vídeos, fotos e paixões <strong>Compartilhe</strong> </p>
            </section>

            <section className="formArea">
            <form className="box" onSubmit={(infosDoEvento) => {
                infosDoEvento.preventDefault(); // previne que o evento de submit aconteça (sem recarregar)
                fetch('https://alurakut.vercel.app/api/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ githubUser: githubUser })
                })
                .then(async (respostaDoServer) => {
                    const dadosDaResposta = await respostaDoServer.json()
                    nookies.set(null, 'USER_TOKEN', dadosDaResposta.token, {
                        path: '/',
                        maxAge: 86400 * 7
                    })
                    router.push('/');
                })
            }}>
            <p>
                Acesse agora mesmo com seu usuário do <strong>GitHub</strong>!
            </p>
            <input 
                placeholder="Usuário" 
                value={githubUser} 
                onChange={(event) => {
                    setGithubUser(event.target.value);
                }}
            />
            {/* {githubUser.length === 0 // mostra aviso em tempo real
                ? 'Informe usuário'
                : ''
            }    */}
            <button type="submit">
                Login
            </button>
            </form>

            <footer className="box">
                <p>
                Ainda não é membro? <br />
                <a href="/login">
                    <strong>
                    ENTRAR JÁ
                </strong>
                </a>
                </p>
            </footer>
            </section>

            <footer className="footerArea">
            <p>
                © 2021 alura.com.br - <a href="/">Sobre o Orkut.br</a> - <a href="/">Centro de segurança</a> - <a href="/">Privacidade</a> - <a href="/">Termos</a> - <a href="/">Contato</a>
            </p>
            </footer>
        </div>
        </main>
    )
} 