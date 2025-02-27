
// Toggle the sidebar's minimized state
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('minimized');
  }
  
  // Toggle the display of the submenu (for Lessons)
  function toggleSubmenu() {
    const submenu = document.querySelector('.submenu');
    submenu.classList.toggle('show');
  }
  
  // Display the Java compiler content in the main content area
  function showCompiler(type) {
    const content = document.getElementById('content');
    if (type === 'javacompiler') {
      content.innerHTML = `
        <h1>Java Compiler</h1>
        <div data-pym-src="https://www.jdoodle.com/embed/v1/34e2bf0c02fc389"></div>
        <script src="https://www.jdoodle.com/assets/jdoodle-pym.min.js" type="text/javascript"></script>
      `;
    } else {
      content.innerHTML = '';
    }
  }

  // Redirect back to the home page
  function logout() {
    window.location.href = 'index.html';
  }
  