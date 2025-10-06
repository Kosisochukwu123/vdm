function updateImageScale() {
  const images = document.querySelectorAll(".scale-image");

  images.forEach((img) => {
    const container = img.closest(".image-container");
    const rect = container.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    // Calculate how much of the container is visible
    const containerTop = rect.top;
    const containerBottom = rect.bottom;

    // Check if container is in viewport
    if (containerBottom > 0 && containerTop < windowHeight) {
      // Calculate progress through viewport (0 to 1)
      // When element enters from bottom: 0
      // When element is centered: 0.5
      // When element exits from top: 1
      const containerHeight = rect.height;
      const progress =
        (windowHeight - containerTop) / (windowHeight + containerHeight);

      // Clamp progress between 0 and 1
      const clampedProgress = Math.max(0, Math.min(1, progress));

      // Scale from 0.8 to 1.2 based on scroll position
      // Peaks at center of viewport
      const scale =
        0.8 + Math.sin((clampedProgress - 0.5) * Math.PI) * 0.4 + 0.4;

      img.style.transform = `scale(${scale})`;
    } else {
      // Reset scale when out of view
      img.style.transform = "scale(0.8)";
    }
  });
}

// Update on scroll
window.addEventListener("scroll", updateImageScale);

// Update on load
window.addEventListener("load", updateImageScale);

// Initial update
updateImageScale();
