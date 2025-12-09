/**
 * KBC LLC Content Loader
 * Centralized content management system
 *
 * HOW TO ADD NEW AUTHORS OR BOOKS:
 * 1. Edit /data/content.json
 * 2. Add new author to the "authors" array
 * 3. Add new books to the "books" array (use the author's ID in authorId field)
 * 4. Refresh the page - changes appear everywhere automatically!
 */

class ContentLoader {
    constructor() {
        this.data = null;
        this.loaded = false;
    }

    // Load content from JSON file
    async load() {
        if (this.loaded) return this.data;

        try {
            const response = await fetch('data/content.json');
            if (!response.ok) {
                throw new Error('Failed to load content');
            }
            this.data = await response.json();
            this.loaded = true;
            return this.data;
        } catch (error) {
            console.error('Error loading content:', error);
            // Try relative path for subdirectories
            try {
                const response = await fetch('../data/content.json');
                if (!response.ok) {
                    throw new Error('Failed to load content from parent');
                }
                this.data = await response.json();
                this.loaded = true;
                return this.data;
            } catch (e) {
                console.error('Content loading failed completely:', e);
                return null;
            }
        }
    }

    // Get all authors
    getAuthors() {
        return this.data?.authors || [];
    }

    // Get single author by ID
    getAuthor(id) {
        return this.data?.authors?.find(a => a.id === id);
    }

    // Get all books
    getBooks() {
        return this.data?.books || [];
    }

    // Get books by author ID
    getBooksByAuthor(authorId) {
        return this.data?.books?.filter(b => b.authorId === authorId) || [];
    }

    // Get books by genre
    getBooksByGenre(genre) {
        if (genre === 'all') return this.getBooks();
        return this.data?.books?.filter(b => b.genre === genre) || [];
    }

    // Get featured books
    getFeaturedBooks() {
        return this.data?.books?.filter(b => b.featured && b.status === 'published') || [];
    }

    // Get genres
    getGenres() {
        return this.data?.genres || [];
    }

    // Get company info
    getCompany() {
        return this.data?.company || {};
    }

    // Helper: Get author name from author ID
    getAuthorName(authorId) {
        const author = this.getAuthor(authorId);
        return author?.name || 'Unknown Author';
    }

    // Helper: Get author object from book
    getBookAuthor(book) {
        return this.getAuthor(book.authorId);
    }

    // Render author card (for homepage featured authors)
    renderAuthorCard(author) {
        const bookCount = this.getBooksByAuthor(author.id).filter(b => b.status === 'published').length;
        return `
            <div class="author-card">
                <div class="author-image">
                    <img src="${author.image}" alt="${author.name}" loading="lazy">
                </div>
                <div class="author-info">
                    <h3>${author.name}</h3>
                    <p class="author-genre">${author.genre}</p>
                    <p class="author-description">${author.bio.substring(0, 150)}...</p>
                    <div class="author-stats">
                        <span><i class="fas fa-book"></i> ${bookCount} Books</span>
                        <span><i class="${this.getGenreIcon(author.genre)}"></i> ${author.genre.split(' ')[0]}</span>
                    </div>
                    <a href="authors.html#${author.id}" class="btn btn-outline">View Profile</a>
                </div>
            </div>
        `;
    }

    // Render full author profile (for authors page)
    renderAuthorProfile(author) {
        const books = this.getBooksByAuthor(author.id);
        const publishedBooks = books.filter(b => b.status === 'published');

        return `
            <div id="${author.id}" class="author-showcase">
                <div class="author-profile">
                    <div class="author-image">
                        <img src="${author.imageLarge}" alt="${author.name}" loading="lazy">
                    </div>
                    <div class="author-details">
                        <h2>${author.name}</h2>
                        <p class="author-genre">${author.genre}</p>
                        <p class="author-bio">${author.bio}</p>

                        <div class="author-stats-detailed">
                            <div class="stat">
                                <span class="number">${publishedBooks.length}</span>
                                <span class="label">Published Books</span>
                            </div>
                            <div class="stat">
                                <span class="number">${author.stats.publishingSince}</span>
                                <span class="label">Publishing Since</span>
                            </div>
                            <div class="stat">
                                <span class="number">${author.stats.series}</span>
                                <span class="label">${author.stats.series > 1 ? 'Series' : 'Series'}</span>
                            </div>
                        </div>

                        <div class="author-specialties">
                            ${author.specialties.map(s => `<span class="specialty">${s}</span>`).join('')}
                        </div>

                        <div class="author-links">
                            ${author.links.amazon ? `
                                <a href="${author.links.amazon}" class="btn btn-amazon" target="_blank">
                                    <i class="fab fa-amazon"></i> Amazon Store
                                </a>
                            ` : ''}
                            ${author.links.books2read ? `
                                <a href="${author.links.books2read}" class="btn btn-universal" target="_blank">
                                    <i class="fas fa-book-open"></i> All Retailers
                                </a>
                            ` : ''}
                        </div>
                    </div>
                </div>

                <div class="author-books">
                    <h3>Published Works</h3>
                    <div class="books-list">
                        ${books.map(book => this.renderAuthorBookItem(book)).join('')}
                    </div>
                </div>
            </div>
        `;
    }

    // Render book item for author's book list
    renderAuthorBookItem(book) {
        const isPublished = book.status === 'published';

        return `
            <div class="book-item">
                <div class="book-item-image${!isPublished ? ' coming-soon' : ''}">
                    ${isPublished && book.image ? `
                        <img src="${book.image}" alt="${book.title}" loading="lazy">
                    ` : `
                        <div class="coming-soon-content">
                            <div class="coming-soon-icon">📖</div>
                            <div class="coming-soon-text">COMING SOON</div>
                        </div>
                    `}
                </div>
                <div class="book-item-content">
                    <div class="book-details">
                        <h4>${book.title}</h4>
                        <p>${book.description}</p>
                    </div>
                    <span class="book-status ${this.getStatusClass(book.status)}">${this.getStatusLabel(book.status)}</span>
                </div>
            </div>
        `;
    }

    // Render book card for catalog
    renderBookCard(book) {
        const author = this.getAuthor(book.authorId);
        const isPublished = book.status === 'published';

        return `
            <div class="book-card-detailed" data-genre="${book.genre}">
                <div class="book-cover${!isPublished ? ' coming-soon' : ''}">
                    ${isPublished && book.image ? `
                        <img src="${book.image}" alt="${book.title}" loading="lazy">
                        <div class="book-overlay">
                            <div class="book-links">
                                ${book.amazonUrl && book.amazonUrl !== '#' ? `
                                    <a href="${book.amazonUrl}" class="btn btn-amazon" target="_blank">
                                        <i class="fab fa-amazon"></i> Amazon
                                    </a>
                                ` : ''}
                                ${book.books2readUrl ? `
                                    <a href="${book.books2readUrl}" class="btn btn-universal" target="_blank">
                                        <i class="fas fa-book-open"></i> Other Stores
                                    </a>
                                ` : ''}
                            </div>
                        </div>
                    ` : `
                        <div class="coming-soon-content">
                            <div class="coming-soon-icon">📖</div>
                            <div class="coming-soon-text">COMING SOON</div>
                        </div>
                    `}
                </div>
                <div class="book-info">
                    <div class="book-meta">
                        <span class="book-genre">${this.capitalizeFirst(book.genre)}</span>
                        <span class="book-status ${this.getStatusClass(book.status)}">${this.getStatusLabel(book.status)}</span>
                    </div>
                    <h3>${book.title}</h3>
                    <p class="book-author">by ${author?.name || 'Unknown'}</p>
                    <p class="book-description">${book.description}</p>
                    <div class="book-details">
                        <span><i class="fas fa-calendar"></i> ${book.year}</span>
                        <span><i class="fas fa-tag"></i> ${book.price}</span>
                    </div>
                    <div class="book-purchase-buttons">
                        ${isPublished && book.amazonUrl && book.amazonUrl !== '#' ? `
                            <a href="${book.amazonUrl}" class="btn btn-amazon" target="_blank">
                                <i class="fab fa-amazon"></i> Buy on Amazon
                            </a>
                        ` : ''}
                        ${isPublished && book.books2readUrl ? `
                            <a href="${book.books2readUrl}" class="btn btn-universal" target="_blank">
                                <i class="fas fa-book-open"></i> Other Stores
                            </a>
                        ` : ''}
                        ${!isPublished ? `
                            <a href="#" class="btn btn-disabled" onclick="return false;">
                                <i class="fas fa-clock"></i> Coming Soon
                            </a>
                        ` : ''}
                    </div>
                </div>
            </div>
        `;
    }

    // Render featured book card (homepage)
    renderFeaturedBookCard(book) {
        const author = this.getAuthor(book.authorId);

        return `
            <div class="book-card">
                <div class="book-item-image">
                    <img src="${book.image}" alt="${book.title}" loading="lazy">
                </div>
                <div class="book-item-content">
                    <div class="book-details">
                        <h3>${book.title.length > 40 ? book.title.substring(0, 40) + '...' : book.title}</h3>
                        <p class="book-author">${author?.name}</p>
                        <p class="book-genre">${this.capitalizeFirst(book.genre)}</p>
                        <p class="book-description">${book.description.substring(0, 100)}...</p>
                    </div>
                    <div class="book-links">
                        ${book.amazonUrl && book.amazonUrl !== '#' ? `
                            <a href="${book.amazonUrl}" class="btn btn-amazon" target="_blank">Amazon</a>
                        ` : `
                            <a href="books.html" class="btn btn-amazon">View</a>
                        `}
                        <a href="books.html" class="btn btn-universal">More Info</a>
                    </div>
                </div>
            </div>
        `;
    }

    // Render genre card
    renderGenreCard(genre) {
        const bookCount = this.getBooksByGenre(genre.id).length;

        return `
            <div class="genre-card">
                <div class="genre-icon">
                    <i class="${genre.icon}"></i>
                </div>
                <h3>${genre.name}</h3>
                <p>${genre.description}</p>
                <span class="genre-count">${bookCount} Books</span>
            </div>
        `;
    }

    // Render stats for homepage
    renderStats() {
        const company = this.getCompany();
        const publishedBooks = this.getBooks().filter(b => b.status === 'published').length;
        const authors = this.getAuthors().length;

        return {
            totalTitles: publishedBooks,
            featuredAuthors: authors,
            activeSeries: company.stats?.activeSeries || 3
        };
    }

    // Helper: Get status CSS class
    getStatusClass(status) {
        const classes = {
            'published': 'published',
            'ready': 'manuscript',
            'in-progress': 'draft'
        };
        return classes[status] || 'draft';
    }

    // Helper: Get status label
    getStatusLabel(status) {
        const labels = {
            'published': 'Published',
            'ready': 'Ready',
            'in-progress': 'In Progress'
        };
        return labels[status] || status;
    }

    // Helper: Capitalize first letter
    capitalizeFirst(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    // Helper: Get genre icon class
    getGenreIcon(genreName) {
        const icons = {
            'romance': 'fas fa-heart',
            'technology': 'fas fa-microchip',
            'mystery': 'fas fa-search',
            'thriller': 'fas fa-mask',
            'satirical': 'fas fa-laugh',
            'historical': 'fas fa-tree',
            'adventure': 'fas fa-compass'
        };
        const key = genreName.toLowerCase().split(' ')[0];
        return icons[key] || 'fas fa-book';
    }
}

// Create global instance
const contentLoader = new ContentLoader();

// Initialize content on page load
document.addEventListener('DOMContentLoaded', async function() {
    await contentLoader.load();

    // Check which page we're on and render appropriate content
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    switch (currentPage) {
        case 'index.html':
        case '':
            renderHomePage();
            break;
        case 'authors.html':
            renderAuthorsPage();
            break;
        case 'books.html':
            renderBooksPage();
            break;
    }
});

// Render homepage content
async function renderHomePage() {
    // Update stats
    const stats = contentLoader.renderStats();
    const statNumbers = document.querySelectorAll('.hero-stats .stat-number');
    if (statNumbers.length >= 3) {
        statNumbers[0].textContent = stats.totalTitles;
        statNumbers[1].textContent = stats.featuredAuthors;
        statNumbers[2].textContent = stats.activeSeries;
    }

    // Render featured authors (first 3)
    const authorsGrid = document.querySelector('.featured-authors .authors-grid');
    if (authorsGrid) {
        const authors = contentLoader.getAuthors().slice(0, 3);
        authorsGrid.innerHTML = authors.map(a => contentLoader.renderAuthorCard(a)).join('');
    }

    // Render featured/latest books
    const booksGrid = document.querySelector('.latest-releases .books-grid');
    if (booksGrid) {
        const featuredBooks = contentLoader.getFeaturedBooks().slice(0, 3);
        if (featuredBooks.length > 0) {
            booksGrid.innerHTML = featuredBooks.map(b => contentLoader.renderFeaturedBookCard(b)).join('');
        }
    }

    // Render genre cards
    const genresGrid = document.querySelector('.genres .genres-grid');
    if (genresGrid) {
        const genres = contentLoader.getGenres().slice(0, 6);
        genresGrid.innerHTML = genres.map(g => contentLoader.renderGenreCard(g)).join('');
    }

    // Re-initialize animations after dynamic content load
    initializeAnimations();
}

// Render authors page content
async function renderAuthorsPage() {
    const container = document.querySelector('.authors-showcase .container');
    if (container) {
        const authors = contentLoader.getAuthors();
        container.innerHTML = authors.map(a => contentLoader.renderAuthorProfile(a)).join('');
    }

    // Handle hash navigation (e.g., #bishop-king)
    if (window.location.hash) {
        const targetId = window.location.hash.substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            setTimeout(() => {
                targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
        }
    }

    initializeAnimations();
}

// Render books page content
async function renderBooksPage() {
    const catalogGrid = document.querySelector('.catalog-grid');
    if (catalogGrid) {
        const books = contentLoader.getBooks();
        catalogGrid.innerHTML = books.map(b => contentLoader.renderBookCard(b)).join('');
    }

    // Update stats
    const statNumbers = document.querySelectorAll('.catalog-stats .stat-number');
    if (statNumbers.length >= 4) {
        const publishedBooks = contentLoader.getBooks().filter(b => b.status === 'published').length;
        const authors = contentLoader.getAuthors().length;
        const genres = contentLoader.getGenres().length;

        statNumbers[0].textContent = publishedBooks;
        statNumbers[1].textContent = authors;
        statNumbers[2].textContent = genres;
        statNumbers[3].textContent = '12+';
    }

    // Handle URL parameters for filtering
    const urlParams = new URLSearchParams(window.location.search);
    const genreParam = urlParams.get('genre');
    if (genreParam) {
        filterBooksByGenre(genreParam);
        // Update active filter button
        const filterBtn = document.querySelector(`.filter-btn[data-filter="${genreParam}"]`);
        if (filterBtn) {
            document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
            filterBtn.classList.add('active');
        }
    }

    // Re-attach filter event listeners
    initializeBookFilters();
    initializeAnimations();
}

// Filter books by genre
function filterBooksByGenre(genre) {
    const bookCards = document.querySelectorAll('.book-card-detailed');
    bookCards.forEach(card => {
        if (genre === 'all' || card.getAttribute('data-genre') === genre) {
            card.style.display = 'grid';
            card.classList.add('fade-in');
        } else {
            card.style.display = 'none';
        }
    });
}

// Initialize book filter buttons
function initializeBookFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const bookCards = document.querySelectorAll('.book-card-detailed');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');

            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            filterBooksByGenre(filter);
        });
    });
}

// Initialize animations for dynamic content
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.author-card, .book-card, .book-card-detailed, .genre-card, .author-showcase, .book-item').forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });
}
