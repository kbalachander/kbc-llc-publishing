# KBC LLC Website Maintenance Guide

## 🔄 Regular Updates

### Adding New Books

#### 1. Published Books
When a new book is published:

**Step 1: Add to Books Catalog (books.html)**
```html
<div class="book-card-detailed" data-genre="[GENRE]">
    <div class="book-cover">
        <img src="https://images-na.ssl-images-amazon.com/images/P/[ASIN].01.L.jpg" alt="[BOOK_TITLE]" loading="lazy">
        <div class="book-overlay">
            <div class="book-links">
                <a href="https://www.amazon.com/dp/[ASIN]" class="btn btn-amazon" target="_blank">
                    <i class="fab fa-amazon"></i> Amazon
                </a>
                <a href="[BOOKS2READ_AUTHOR_URL]" class="btn btn-universal" target="_blank">
                    <i class="fas fa-book-open"></i> All Stores
                </a>
            </div>
        </div>
    </div>
    <div class="book-info">
        <div class="book-meta">
            <span class="book-genre">[GENRE]</span>
            <span class="book-status published">Published</span>
        </div>
        <h3>[BOOK_TITLE]</h3>
        <p class="book-author">by [AUTHOR_NAME]</p>
        <p class="book-description">[BOOK_DESCRIPTION]</p>
        <div class="book-details">
            <span><i class="fas fa-calendar"></i> [YEAR]</span>
            <span><i class="fas fa-tag"></i> $[PRICE_RANGE]</span>
        </div>
        <div class="book-purchase-buttons">
            <a href="https://www.amazon.com/dp/[ASIN]" class="btn btn-amazon" target="_blank">
                <i class="fab fa-amazon"></i> Buy on Amazon
            </a>
            <a href="[BOOKS2READ_URL]" class="btn btn-universal" target="_blank">
                <i class="fas fa-book-open"></i> All Stores
            </a>
        </div>
    </div>
</div>
```

**Step 2: Add to Author Profile (authors.html)**
```html
<div class="book-item">
    <div class="book-item-image">
        <img src="https://images-na.ssl-images-amazon.com/images/P/[ASIN].01.L.jpg" alt="[BOOK_TITLE]" loading="lazy">
    </div>
    <div class="book-item-content">
        <div class="book-details">
            <h4>[BOOK_TITLE]</h4>
            <p>[BOOK_DESCRIPTION]</p>
        </div>
        <span class="book-status published">Published</span>
    </div>
</div>
```

**Step 3: Update Statistics**
- Update author book counts in authors.html
- Update homepage hero statistics
- Update genre counts in homepage genres section

#### 2. Unpublished Books (Coming Soon)
For manuscripts/works in progress:

```html
<div class="book-card-detailed" data-genre="[GENRE]">
    <div class="book-cover coming-soon">
        <div class="coming-soon-content">
            <div class="coming-soon-icon">📖</div>
            <div class="coming-soon-text">COMING SOON</div>
        </div>
    </div>
    <div class="book-info">
        <div class="book-meta">
            <span class="book-genre">[GENRE]</span>
            <span class="book-status draft">In Progress</span>
        </div>
        <!-- Rest of content -->
        <div class="book-purchase-buttons">
            <a href="#" class="btn btn-disabled" onclick="return false;">
                <i class="fas fa-clock"></i> Coming Soon
            </a>
        </div>
    </div>
</div>
```

### Adding New Authors

#### 1. Create Author Profile Section
Add to authors.html:
```html
<div id="[author-slug]" class="author-showcase">
    <div class="author-profile">
        <div class="author-image">
            <img src="assets/images/authors/[author-name]-large.jpg" alt="[Author Name]" loading="lazy">
        </div>
        <div class="author-details">
            <h2>[Author Name]</h2>
            <p class="author-genre">[Genre Specialty]</p>
            <p class="author-bio">[Author Biography]</p>
            
            <div class="author-stats-detailed">
                <div class="stat">
                    <span class="number">[BOOK_COUNT]</span>
                    <span class="label">Published Books</span>
                </div>
                <div class="stat">
                    <span class="number">2025</span>
                    <span class="label">Publishing Since</span>
                </div>
                <div class="stat">
                    <span class="number">[SERIES_COUNT]</span>
                    <span class="label">Active Series</span>
                </div>
            </div>

            <div class="author-specialties">
                <span class="specialty">[Specialty 1]</span>
                <span class="specialty">[Specialty 2]</span>
                <!-- Add more specialties -->
            </div>

            <div class="author-links">
                <a href="[AMAZON_STORE_URL]" class="btn btn-amazon" target="_blank">
                    <i class="fab fa-amazon"></i> Amazon Store
                </a>
                <a href="[BOOKS2READ_URL]" class="btn btn-universal" target="_blank">
                    <i class="fas fa-book-open"></i> All Retailers
                </a>
            </div>
        </div>
    </div>

    <div class="author-books">
        <h3>Published Works</h3>
        <div class="books-list">
            <!-- Add book items here -->
        </div>
    </div>
</div>
```

#### 2. Add to Homepage
Add to index.html featured authors section:
```html
<div class="author-card">
    <div class="author-image">
        <img src="assets/images/authors/[author-name].jpg" alt="[Author Name]" loading="lazy">
    </div>
    <div class="author-info">
        <h3>[Author Name]</h3>
        <p class="author-genre">[Genre]</p>
        <p class="author-description">[Short Description]</p>
        <div class="author-stats">
            <span><i class="fas fa-book"></i> [X] Books</span>
            <span><i class="fas fa-[icon]"></i> [Genre]</span>
        </div>
        <a href="authors.html#[author-slug]" class="btn btn-outline">View Profile</a>
    </div>
</div>
```

## 🎯 Content Guidelines

### Book Descriptions
- **Keep descriptions engaging** and specific to the book
- **Include series information** when applicable
- **Mention key themes** or unique elements
- **Target 2-3 sentences** for catalog descriptions

### Author Biographies
- **Focus on writing style** and genre expertise
- **Mention notable series** or achievements
- **Keep professional** but engaging tone
- **Include unique specializations**

### Image Requirements
- **Author photos:** 300x300px minimum, professional quality
- **Book covers:** Use Amazon ASIN URLs for official covers
- **Coming Soon:** Use provided CSS styling for unpublished works

## 🔧 Technical Updates

### When Making Changes
**IMPORTANT:** Always update changes on ALL relevant pages:

1. **Book additions/updates:** Update books.html, authors.html, and homepage if featured
2. **Author updates:** Update authors.html and homepage featured section
3. **Statistics changes:** Update homepage hero stats and genre counts
4. **Images:** Ensure consistent sizing and formatting across all pages

### CSS Updates
When modifying styles:
- **Use CSS variables** for colors and consistent theming
- **Test responsive design** on mobile, tablet, and desktop
- **Maintain accessibility** with proper contrast and sizing
- **Keep consistent** with existing design patterns

### JavaScript Modifications
- **Test filtering functionality** after any book catalog changes
- **Verify search works** with new content
- **Check mobile navigation** after any structural changes
- **Test form validation** if contact forms are modified

## 📊 Statistics Tracking

### Current Counts (Update when changed)
- **Total Titles:** 20 (17 published + 3 unpublished)
- **Featured Authors:** 5
- **Active Series:** 3
- **Genres:** 6 (Romance, Technology, Mystery, Thriller, Satirical, Historical)

### Genre Breakdown
- **Romance:** 5 books (Bishop King)
- **Technology:** 4 books (Rio Vale)
- **Mystery & Crime:** 5 books (Siva Kanth - includes adventure)
- **Thriller:** 3 books (Michael Harrison - includes unpublished)
- **Satirical:** 3 books (Akiel Barton - includes unpublished)
- **Historical:** 1 book (Siva Kanth)

## 🌐 Deployment Process

### GitHub Pages Deployment
1. **Make changes** in local repository
2. **Test locally** if possible
3. **Commit changes** with descriptive messages
4. **Push to main branch**
5. **Wait 5-10 minutes** for GitHub Pages to update

### Git Commands
```bash
cd "/Users/kbc/Dropbox/Books/KBC LLC/kbc-llc-publishing"
git add .
git commit -m "Description of changes"
git push origin main
```

### Custom Domain Setup
- **Domain:** kbcllc.org (CNAME backup available)
- **DNS Configuration:** A records pointing to GitHub Pages IPs
- **SSL:** Automatic via GitHub Pages

## 🔍 Troubleshooting

### Common Issues
1. **Images not loading:** Check ASIN URLs and Amazon availability
2. **Filtering not working:** Verify data-genre attributes match filter buttons
3. **Mobile navigation:** Check JavaScript hamburger menu functionality
4. **Badge alignment:** Ensure consistent CSS properties for genre/status badges

### Image Issues
- **Amazon covers:** Use pattern `https://images-na.ssl-images-amazon.com/images/P/[ASIN].01.L.jpg`
- **Author photos:** Ensure proper sizing and object-fit: contain
- **Coming Soon:** Use provided HTML structure with coming-soon-content

### Performance Optimization
- **Optimize images** for web delivery
- **Minimize CSS/JS** for production
- **Use CDN resources** when possible
- **Test loading speeds** regularly

## 📈 SEO Considerations

### Meta Tags
- **Unique titles** for each page
- **Descriptive meta descriptions** for all pages
- **Proper heading hierarchy** (H1 > H2 > H3)
- **Alt text** for all images

### Content Structure
- **Semantic HTML** structure
- **Proper internal linking** between pages
- **Structured data** for books and authors
- **Mobile-friendly** design

---

**Documentation Version:** 1.0.0  
**Last Updated:** August 30, 2025  
**Maintained By:** KBC LLC Team