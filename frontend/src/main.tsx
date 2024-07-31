import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import ApolloProviderComponent from './ApolloProvider.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ApolloProviderComponent>
    <App />
  </ApolloProviderComponent>,
)
