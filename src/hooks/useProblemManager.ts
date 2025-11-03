
import { useState, useEffect } from 'react';
import { MathProblem, FieldKey } from '../types/mathProblem';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

export function useProblemManager(problems: MathProblem[], selectedTable: string = 'problems_oge_100') {
  const { toast } = useToast();
  const [selectedProblemId, setSelectedProblemId] = useState<string>("");
  const [currentProblem, setCurrentProblem] = useState<MathProblem | null>(null);
  const [selectedField, setSelectedField] = useState<FieldKey | null>(null);
  const [editValue, setEditValue] = useState<string>("");
  const [imageMap, setImageMap] = useState<Record<string, string>>({});

  // Update current problem when selectedProblemId or problems change
  useEffect(() => {
    if (selectedProblemId) {
      const problem = problems.find(p => p.question_id === selectedProblemId);
      if (problem) {
        console.log('Selected problem:', problem);
        // If there's a problem_image, check if it exists in our imageMap
        if (problem.problem_image && imageMap[problem.problem_image]) {
          setCurrentProblem({
            ...problem,
            problem_image: imageMap[problem.problem_image]
          });
        } else {
          setCurrentProblem(problem);
        }
        setSelectedField(null);
        setEditValue("");
      }
    }
  }, [selectedProblemId, problems, imageMap]);

  const handleFieldClick = (field: FieldKey, value: string) => {
    setSelectedField(field);
    setEditValue(value || "");
  };

  const handleSaveChanges = async () => {
    if (!currentProblem || !selectedField) return;

    // Skip updates for ogemath_fipi_bank table for fields that don't exist
    if (selectedTable === 'ogemath_fipi_bank') {
      const allowedFields = ['problem_text', 'solution_text', 'solutiontextexpanded', 'problem_image', 'answer', 'problem_number_type', 'problem_link', 'comments'];
      if (!allowedFields.includes(selectedField)) {
        toast({
          title: "Update Not Supported",
          description: `Cannot update ${selectedField} for this table type.`,
          variant: "destructive"
        });
        return;
      }
    }

    // Skip updates for math_skills_questions table for fields that don't exist
    if (selectedTable === 'math_skills_questions') {
      const allowedFields = ['question_id', 'problem_text', 'solution_text', 'solutiontextexpanded', 'problem_image', 'answer', 'code', 'difficulty', 'skills', 'problem_number_type', 'problem_link', 'comments', 'option1', 'option2', 'option3', 'option4'];
      if (!allowedFields.includes(selectedField)) {
        toast({
          title: "Update Not Supported",
          description: `Cannot update ${selectedField} for this table type.`,
          variant: "destructive"
        });
        return;
      }
    }

    let updatedValue = editValue;
    // For boolean fields, convert string to boolean
    if (typeof currentProblem[selectedField] === 'boolean') {
      updatedValue = editValue.toLowerCase() === 'true' ? 'true' : 'false';
    }

    const updatedProblem = {
      ...currentProblem,
      [selectedField]: updatedValue,
      corrected: selectedTable !== 'ogemath_fipi_bank' ? true : currentProblem.corrected // Only update corrected for tables that support it
    };

    try {
      let updateData: any = { [selectedField]: updatedValue };
      
      // Only add corrected field for tables that support it
      if (selectedTable !== 'ogemath_fipi_bank') {
        updateData.corrected = true;
      }

      let error;
      
      // Update in Supabase with proper typing
      if (selectedTable === 'ogemath_fipi_bank') {
        const result = await supabase
          .from('ogemath_fipi_bank')
          .update(updateData)
          .eq('question_id', parseInt(currentProblem.question_id));
        error = result.error;
      } else if (selectedTable === 'egemathprof') {
        const result = await supabase
          .from('egemathprof' as any)
          .update(updateData)
          .eq('question_id', parseInt(currentProblem.question_id));
        error = result.error;
      } else if (selectedTable === 'egemathbase') {
        const result = await supabase
          .from('egemathbase' as any)
          .update(updateData)
          .eq('question_id', parseInt(currentProblem.question_id));
        error = result.error;
      } else if (selectedTable === 'problems_oge_100') {
        const result = await supabase
          .from('problems_oge_100')
          .update(updateData)
          .eq('question_id', currentProblem.question_id);
        error = result.error;
      } else if (selectedTable === 'OGE_SHFIPI_problems_1_25') {
        const result = await supabase
          .from('OGE_SHFIPI_problems_1_25')
          .update(updateData)
          .eq('question_id', currentProblem.question_id);
        error = result.error;
      } else if (selectedTable === 'new_problems_by_skills_1') {
        const result = await supabase
          .from('new_problems_by_skills_1')
          .update(updateData)
          .eq('question_id', currentProblem.question_id);
        error = result.error;
      } else if (selectedTable === 'new_problems_by_skills_2') {
        const result = await supabase
          .from('new_problems_by_skills_2')
          .update(updateData)
          .eq('question_id', currentProblem.question_id);
        error = result.error;
      } else if (selectedTable === 'math_skills_questions') {
        const result = await supabase
          .from('math_skills_questions' as any)
          .update(updateData)
          .eq('question_id', currentProblem.question_id);
        error = result.error;
      }
            
      if (error) {
        toast({
          title: "Update Failed",
          description: error.message,
          variant: "destructive"
        });
        return;
      }
    } catch (error) {
      console.error('Error updating problem:', error);
      toast({
        title: "Update Failed",
        description: `Could not save changes to the ${selectedTable} table`,
        variant: "destructive"
      });
      return;
    }
    
    // Update local state
    const updatedProblems = problems.map(p => 
      p.question_id === currentProblem.question_id ? updatedProblem : p
    );

    setCurrentProblem(updatedProblem);
    
    toast({
      title: "Changes Saved",
      description: `Updated ${selectedField} for problem ${currentProblem.question_id}`
    });

    return updatedProblems;
  };

  const handleToggleChecked = async () => {
    if (!currentProblem) return;
    
    const newCheckedValue = !currentProblem.checked;
    
    try {
      let error;
      
      if (selectedTable === 'ogemath_fipi_bank') {
        // For ogemath_fipi_bank, convert boolean to number (0 or 1)
        const result = await supabase
          .from('ogemath_fipi_bank')
          .update({ checked: newCheckedValue ? "1" : "0" })
          .eq('question_id', parseInt(currentProblem.question_id));
        error = result.error;
      } else if (selectedTable === 'egemathprof') {
        // For egemathprof, convert boolean to string (1 or 0)
        const result = await supabase
          .from('egemathprof' as any)
          .update({ checked: newCheckedValue ? "1" : "0" })
          .eq('question_id', parseInt(currentProblem.question_id));
        error = result.error;
      } else if (selectedTable === 'egemathbase') {
        // For egemathbase, convert boolean to string (1 or 0)
        const result = await supabase
          .from('egemathbase' as any)
          .update({ checked: newCheckedValue ? "1" : "0" })
          .eq('question_id', parseInt(currentProblem.question_id));
        error = result.error;
      } else if (selectedTable === 'problems_oge_100') {
        const result = await supabase
          .from('problems_oge_100')
          .update({ checked: newCheckedValue })
          .eq('question_id', currentProblem.question_id);
        error = result.error;
      } else if (selectedTable === 'OGE_SHFIPI_problems_1_25') {
        const result = await supabase
          .from('OGE_SHFIPI_problems_1_25')
          .update({ checked: newCheckedValue })
          .eq('question_id', currentProblem.question_id);
        error = result.error;
      } else if (selectedTable === 'new_problems_by_skills_1') {
        const result = await supabase
          .from('new_problems_by_skills_1')
          .update({ checked: newCheckedValue })
          .eq('question_id', currentProblem.question_id);
        error = result.error;
      } else if (selectedTable === 'new_problems_by_skills_2') {
        const result = await supabase
          .from('new_problems_by_skills_2')
          .update({ checked: newCheckedValue })
          .eq('question_id', currentProblem.question_id);
        error = result.error;
      } else if (selectedTable === 'math_skills_questions') {
        const result = await supabase
          .from('math_skills_questions' as any)
          .update({ checked: newCheckedValue })
          .eq('question_id', currentProblem.question_id);
        error = result.error;
      }
      
      if (error) {
        console.error('Error updating checked status:', error);
        toast({
          title: "Update Failed",
          description: error.message,
          variant: "destructive"
        });
        return;
      }
      
      // Update local state
      const updatedProblem = {
        ...currentProblem,
        checked: newCheckedValue
      };
      
      const updatedProblems = problems.map(p => 
        p.question_id === currentProblem.question_id ? updatedProblem : p
      );
      
      setCurrentProblem(updatedProblem);
      
      toast({
        title: newCheckedValue ? "Problem Marked as Checked" : "Problem Marked as Unchecked",
        description: `Problem ${currentProblem.question_id} has been updated`
      });

      return updatedProblems;
    } catch (error) {
      console.error('Error updating checked status:', error);
      toast({
        title: "Update Failed",
        description: "Could not update checked status",
        variant: "destructive"
      });
      return null;
    }
  };
  
  const handleImageUpload = (images: Record<string, string>) => {
    setImageMap(images);
  };

  return {
    selectedProblemId,
    setSelectedProblemId,
    currentProblem,
    selectedField,
    editValue,
    setEditValue,
    handleFieldClick,
    handleSaveChanges,
    handleToggleChecked,
    handleImageUpload,
  };
}
