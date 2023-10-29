import '@styles/globels.css'

import Nav from '@components/Nav'
import Provider from '@components/Provider'

export const metaData = {
    title:'prompt-ai',
    description:'Discover & Share AI Prompts'
}

const RootLayout = ({ children }) => {
  return (
    <html lang='en'>
        <body>
            <Provider>

            <div className='main' >
                <div className='gradient' ></div>
            </div>

            <main className='app' >
                <Nav />
                {children}
            </main>

            </Provider>
        </body>
    </html>
  )
}

export default RootLayout