document.addEventListener('DOMContentLoaded', function() {
  const courseDropdown = document.getElementById('course');
  const classDropdown = document.getElementById('class');
  const resourceDropdown = document.getElementById('resource');
  const contentDropdown = document.getElementById('content');

  // Fetch course options from the server
  fetch('https://app.hirahasan.com/courses', {
    headers: {
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MzE3NDEwMDksImV4cCI6MTczMTgyNzQwOX0.SILJArxbIyYJ-ccxn39TMnYpRm72VN9JY7C3EbpzRmE'
    }
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(courses => {
    if (Array.isArray(courses) && courses.length > 0) {
      courses.forEach(course => {
        const option = document.createElement('option');
        option.value = course.code; // Use course code as value
        option.textContent = course.name;
        courseDropdown.appendChild(option);
      });
    } else {
      console.error('No courses available');
    }
  })
  .catch(error => console.error('Error fetching course options:', error));

  courseDropdown.addEventListener('change', function() {
    const selectedCourseCode = courseDropdown.value;
    console.log(selectedCourseCode);
    
    if (selectedCourseCode) {
      // Fetch classes based on selected course code
      fetch(`https://app.hirahasan.com/classes/course/${selectedCourseCode}`, {
        headers: {
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MzE3NDEwMDksImV4cCI6MTczMTgyNzQwOX0.SILJArxbIyYJ-ccxn39TMnYpRm72VN9JY7C3EbpzRmE'
        }
      })
      .then(response => response.json())
      .then(classes => {
        console.log(classes);
        
        classDropdown.innerHTML = '<option value="">Select Class</option>'; // Reset class dropdown
        if (Array.isArray(classes) && classes.length > 0) {
          classes.forEach(cls => {
            const option = document.createElement('option');
            option.value = cls.id;
            option.textContent = cls.class_title;
            classDropdown.appendChild(option);
          });
          classDropdown.disabled = false;
        } else {
          const option = document.createElement('option');
          option.value = "";
          option.textContent = "No classes available";
          classDropdown.appendChild(option);
          classDropdown.disabled = true;
        }
      })
      .catch(error => {
        console.error('Error fetching class options:', error);
        const option = document.createElement('option');
        option.value = "";
        option.textContent = "Error loading classes";
        classDropdown.appendChild(option);
        classDropdown.disabled = true;
      });
    } else {
      classDropdown.disabled = true;
    }
  });

  classDropdown.addEventListener('change', function() {
    const selectedClassId = classDropdown.value;
    console.log(selectedClassId);
    if (selectedClassId) {
      // Fetch resources based on selected class ID
      fetch(`https://app.hirahasan.com/resources/${selectedClassId}`, {
        headers: {
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MzE3NDEwMDksImV4cCI6MTczMTgyNzQwOX0.SILJArxbIyYJ-ccxn39TMnYpRm72VN9JY7C3EbpzRmE'
        }
      })
      .then(response => response.json())
      .then(resources => {
        console.log(resources);

        resourceDropdown.innerHTML = '<option value="">Select Resource</option>'; // Reset resource dropdown
        if (Array.isArray(resources) && resources.length > 0) {
          resources.forEach(resource => {
            const option = document.createElement('option');
            option.value = resource.id;
            option.textContent = resource.resource_title;
            resourceDropdown.appendChild(option);
          });
          resourceDropdown.disabled = false;
        } else {
          const option = document.createElement('option');
          option.value = "";
          option.textContent = "No resources available";
          resourceDropdown.appendChild(option);
          resourceDropdown.disabled = true;
        }
      })
      .catch(error => {
        console.error('Error fetching resource options:', error);
        const option = document.createElement('option');
        option.value = "";
        option.textContent = "Error loading resources";
        resourceDropdown.appendChild(option);
        resourceDropdown.disabled = true;
      });
    } else {
      resourceDropdown.innerHTML = '<option value="">Select Resource</option>'; // Reset resource dropdown
      resourceDropdown.disabled = true;
    }
  });

  resourceDropdown.addEventListener('change', function() {
    const selectedResourceId = resourceDropdown.value;
    if (selectedResourceId) {
      // Fetch contents based on selected resource ID
      fetch(`https://app.hirahasan.com/contents/resource/${selectedResourceId}`, {
        headers: {
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MzE3NDEwMDksImV4cCI6MTczMTgyNzQwOX0.SILJArxbIyYJ-ccxn39TMnYpRm72VN9JY7C3EbpzRmE'
        }
      })
      .then(response => response.json())
      .then(contents => {
        console.log(contents);
          contentDropdown.innerHTML = '<option value="">Select Content</option>'; // Reset content dropdown
          if (Array.isArray(contents) && contents.length > 0) {
            contents.forEach(content => {
              const option = document.createElement('option');
              option.value = content.id;
              option.textContent = content.content_title;
              contentDropdown.appendChild(option);
            });
            contentDropdown.disabled = false;
          } else {
            const option = document.createElement('option');
            option.value = "";
            option.textContent = "No contents available";
            contentDropdown.appendChild(option);
            contentDropdown.disabled = true;
          }
        })
        .catch(error => {
          console.error('Error fetching contents:', error);
          const option = document.createElement('option');
          option.value = "";
          option.textContent = "Error loading contents";
          contentDropdown.appendChild(option);
          contentDropdown.disabled = true;
        });
    } else {
      contentDropdown.innerHTML = '<option value="">Select Content</option>'; // Reset content dropdown
      contentDropdown.disabled = true;
    }
  });
});