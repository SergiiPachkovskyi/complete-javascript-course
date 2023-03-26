import View from './View.js';
import previevView from './previewView.js';

class ResultView extends View {
    _parentElement = document.querySelector('.results');
    _errorMessage = 'No recipes found for your query. Please try again!';
    _message = '';

    _generateMarkup() {
        return this._data.map(result => previevView.render(result, false)).join('');
    }
}

export default new ResultView();
