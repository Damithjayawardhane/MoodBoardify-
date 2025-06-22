import { Component, Input } from '@angular/core';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-export-panel',
  templateUrl: './export-panel.component.html',
  styleUrls: ['./export-panel.component.scss']
})
export class ExportPanelComponent {
  @Input() hasItems = false;

  isExporting = false;
  exportQuality = 'high';
  exportFormat = 'png';

  async exportBoard(): Promise<void> {
    if (this.isExporting) return;

    this.isExporting = true;

    try {
      const moodboardElement = document.getElementById('moodboard');
      if (!moodboardElement) {
        throw new Error('Mood board element not found');
      }

      // Configure export options based on quality
      const scale = this.exportQuality === 'high' ? 2 : 1;
      const options = {
        scale: scale,
        useCORS: true,
        allowTaint: true,
        backgroundColor: null,
        width: moodboardElement.scrollWidth,
        height: moodboardElement.scrollHeight,
        scrollX: 0,
        scrollY: 0
      };

      const canvas = await html2canvas(moodboardElement, options);

      // Create download link
      const link = document.createElement('a');
      const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
      const filename = `moodboard-${timestamp}.${this.exportFormat}`;

      if (this.exportFormat === 'png') {
        link.download = filename;
        link.href = canvas.toDataURL('image/png');
      } else if (this.exportFormat === 'jpg') {
        link.download = filename;
        link.href = canvas.toDataURL('image/jpeg', 0.9);
      }

      link.click();

      // Show success message
      this.showSuccessMessage();

    } catch (error) {
      console.error('Export failed:', error);
      this.showErrorMessage();
    } finally {
      this.isExporting = false;
    }
  }

  private showSuccessMessage(): void {
    // Create a temporary success message
    const message = document.createElement('div');
    message.textContent = 'Mood board exported successfully!';
    message.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: #28a745;
      color: white;
      padding: 1rem 1.5rem;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      z-index: 10000;
      font-weight: 500;
    `;

    document.body.appendChild(message);

    setTimeout(() => {
      document.body.removeChild(message);
    }, 3000);
  }

  private showErrorMessage(): void {
    // Create a temporary error message
    const message = document.createElement('div');
    message.textContent = 'Export failed. Please try again.';
    message.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: #dc3545;
      color: white;
      padding: 1rem 1.5rem;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      z-index: 10000;
      font-weight: 500;
    `;

    document.body.appendChild(message);

    setTimeout(() => {
      document.body.removeChild(message);
    }, 3000);
  }

  onQualityChange(quality: string): void {
    this.exportQuality = quality;
  }

  onFormatChange(format: string): void {
    this.exportFormat = format;
  }
}
