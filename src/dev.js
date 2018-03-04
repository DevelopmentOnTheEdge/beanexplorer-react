import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from './ExampleApp';

render( <AppContainer><App/></AppContainer>, document.getElementById("root"));

if (module && module.hot) {
	module.hot.accept('./ExampleApp', () => {
		const App = require('./ExampleApp').default;
		render(
			<AppContainer>
				<App/>
			</AppContainer>,
			document.getElementById("root")
		);
	});
}
