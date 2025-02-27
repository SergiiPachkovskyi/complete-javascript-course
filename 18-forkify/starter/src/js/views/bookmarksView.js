import View from './View.js';
import previevView from './previewView.js';

class BookmarksView extends View {
    _parentElement = document.querySelector('.bookmarks__list');
    _errorMessage = 'No bookmarks yet. Find a nice recipe and bookmark it!';
    _message = '';

    addHandlerRender(handler) {
        window.addEventListener('load', handler)
    }

    _generateMarkup() {
        return this._data.map(bookmark => previevView.render(bookmark, false)).join('');
    }
}

export default new BookmarksView();