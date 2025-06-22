import { Component, ViewChild } from '@angular/core';
import { MoodboardComponent } from './components/moodboard/moodboard.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'MoodBoardify';

  @ViewChild(MoodboardComponent) moodboardComponent!: MoodboardComponent;

  onAddImage(imageUrl: string): void {
    this.moodboardComponent.addImage(imageUrl);
  }

  onAddText(text: string): void {
    this.moodboardComponent.addText(text);
  }

  onAddSticker(stickerUrl: string): void {
    this.moodboardComponent.addSticker(stickerUrl);
  }

  onChangeBackgroundColor(color: string): void {
    this.moodboardComponent.changeBackgroundColor(color);
  }

  get hasItems(): boolean {
    return this.moodboardComponent?.items?.length > 0;
  }
}
