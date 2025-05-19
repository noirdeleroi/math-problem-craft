
import { useState, ChangeEvent } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { parseCSV } from '../utils/csvUtils';
import { MathProblem } from '../types/mathProblem';

// This component is no longer used in the main UI but kept for reference
interface FileUploaderProps {
  onCSVUpload: (data: MathProblem[]) => void;
  onImageUpload: (imageMap: Record<string, string>) => void;
}

const FileUploader = ({ onCSVUpload, onImageUpload }: FileUploaderProps) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleCSVUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    setIsLoading(true);
    const file = e.target.files[0];
    
    try {
      const data = await parseCSV(file);
      onCSVUpload(data);
      toast({
        title: "CSV Uploaded",
        description: `Successfully loaded ${data.length} problems`,
      });
    } catch (error) {
      console.error('Error parsing CSV:', error);
      toast({
        title: "Upload Failed",
        description: "There was an error parsing the CSV file.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    const imageMap: Record<string, string> = {};
    const files = Array.from(e.target.files);
    
    let loadedCount = 0;
    const totalFiles = files.length;
    
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (loadEvent) => {
        if (loadEvent.target?.result) {
          const fileName = file.name;
          imageMap[fileName] = loadEvent.target.result as string;
          
          loadedCount++;
          if (loadedCount === totalFiles) {
            onImageUpload(imageMap);
            toast({
              title: "Images Uploaded",
              description: `Successfully loaded ${totalFiles} images`,
            });
          }
        }
      };
      reader.readAsDataURL(file);
    });
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      <div>
        <label htmlFor="csv-upload" className="block mb-2 text-sm font-medium">
          Upload CSV File
        </label>
        <input
          type="file"
          id="csv-upload"
          accept=".csv"
          onChange={handleCSVUpload}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
        />
      </div>
      
      <div>
        <label htmlFor="image-upload" className="block mb-2 text-sm font-medium">
          Upload Images
        </label>
        <input
          type="file"
          id="image-upload"
          accept="image/*"
          multiple
          onChange={handleImageUpload}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
        />
      </div>
    </div>
  );
};

export default FileUploader;
