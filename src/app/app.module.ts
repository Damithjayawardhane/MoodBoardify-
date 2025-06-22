import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { AppComponent } from './app.component';
import { MoodboardComponent } from './components/moodboard/moodboard.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { ExportPanelComponent } from './components/export-panel/export-panel.component';

@NgModule({
  declarations: [
    AppComponent,
    MoodboardComponent,
    ToolbarComponent,
    ExportPanelComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    DragDropModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
