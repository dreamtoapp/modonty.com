"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { updateBMCCanvasSection, type BMCSectionId } from "@/actions/bmcCanvas";
import { Plus, Trash2, Save, Loader2, ChevronDown } from "lucide-react";

interface BMCCanvasSectionEditProps {
  sectionId: BMCSectionId;
  sectionData: any;
  sectionLabel: string;
  sectionDescription?: string;
}

export function BMCCanvasSectionEdit({
  sectionId,
  sectionData,
  sectionLabel,
  sectionDescription,
}: BMCCanvasSectionEditProps) {
  const router = useRouter();
  const [data, setData] = useState<any>(sectionData);
  const [isSaving, setIsSaving] = useState(false);
  const [isOpen, setIsOpen] = useState(true);

  const [saveMessage, setSaveMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Sync state with props when they change (after router.refresh())
  useEffect(() => {
    setData(sectionData);
  }, [sectionData]);

  const handleSave = async () => {
    setIsSaving(true);
    setSaveMessage(null);

    // Verify data structure before saving
    if (data === undefined || data === null) {
      setSaveMessage({ type: 'error', text: "Cannot save: data is empty" });
      setIsSaving(false);
      return;
    }

    console.log(`[BMC Canvas Edit] Saving section ${sectionId}:`, {
      dataType: typeof data,
      isArray: Array.isArray(data),
      dataPreview: Array.isArray(data)
        ? `Array with ${data.length} items`
        : typeof data === 'object'
          ? `Object with keys: ${Object.keys(data).join(', ')}`
          : String(data).substring(0, 50),
    });

    try {
      const result = await updateBMCCanvasSection(sectionId, data);
      if (result.success) {
        setSaveMessage({ type: 'success', text: "Section updated successfully" });
        // Refresh server components to get updated data
        router.refresh();
      } else {
        setSaveMessage({ type: 'error', text: result.error || "Failed to update section" });
      }
    } catch (error: any) {
      console.error('[BMC Canvas Edit] Save error:', error);
      setSaveMessage({ type: 'error', text: error?.message || "An error occurred while saving" });
    } finally {
      setIsSaving(false);
    }
  };

  // Handle array sections (keyPartners, keyActivities, etc.)
  if (Array.isArray(data)) {
    return (
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <Card>
          <CollapsibleTrigger asChild>
            <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <CardTitle>{sectionLabel}</CardTitle>
                  {sectionDescription && <CardDescription>{sectionDescription}</CardDescription>}
                </div>
                <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'transform rotate-180' : ''}`} />
              </div>
            </CardHeader>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                {data.map((item, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={item}
                      onChange={(e) => {
                        const newData = [...data];
                        newData[index] = e.target.value;
                        setData(newData);
                      }}
                      placeholder={`Item ${index + 1}`}
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => {
                        const newData = data.filter((_: any, i: number) => i !== index);
                        setData(newData);
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
              <Button
                variant="outline"
                onClick={() => {
                  setData([...data, ""]);
                }}
                className="w-full"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Item
              </Button>
              {saveMessage && (
                <div className={`p-3 rounded-md text-sm ${saveMessage.type === 'success'
                  ? 'bg-green-50 text-green-800 border border-green-200'
                  : 'bg-red-50 text-red-800 border border-red-200'
                  }`}>
                  {saveMessage.text}
                </div>
              )}
              <Button onClick={handleSave} disabled={isSaving} className="w-full">
                {isSaving ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Save Section
                  </>
                )}
              </Button>
            </CardContent>
          </CollapsibleContent>
        </Card>
      </Collapsible>
    );
  }

  // Handle object sections (costStructure, revenueStreams)
  if (typeof data === "object" && data !== null) {
    // Handle costStructure
    if (sectionId === "costStructure") {
      return (
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <Card>
            <CollapsibleTrigger asChild>
              <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <CardTitle>{sectionLabel}</CardTitle>
                    {sectionDescription && <CardDescription>{sectionDescription}</CardDescription>}
                  </div>
                  <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'transform rotate-180' : ''}`} />
                </div>
              </CardHeader>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(data).map(([key, value]) => (
                    <div key={key} className="space-y-2">
                      <label className="text-sm font-medium capitalize">
                        {key.replace(/([A-Z])/g, " $1").trim()}
                      </label>
                      <Input
                        value={value as string}
                        onChange={(e) => {
                          setData({ ...data, [key]: e.target.value });
                        }}
                      />
                    </div>
                  ))}
                </div>
                {saveMessage && (
                  <div className={`p-3 rounded-md text-sm ${saveMessage.type === 'success'
                    ? 'bg-green-50 text-green-800 border border-green-200'
                    : 'bg-red-50 text-red-800 border border-red-200'
                    }`}>
                    {saveMessage.text}
                  </div>
                )}
                <Button onClick={handleSave} disabled={isSaving} className="w-full">
                  {isSaving ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Save Section
                    </>
                  )}
                </Button>
              </CardContent>
            </CollapsibleContent>
          </Card>
        </Collapsible>
      );
    }

    // Handle revenueStreams
    if (sectionId === "revenueStreams") {
      return (
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <Card>
            <CollapsibleTrigger asChild>
              <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <CardTitle>{sectionLabel}</CardTitle>
                    {sectionDescription && <CardDescription>{sectionDescription}</CardDescription>}
                  </div>
                  <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'transform rotate-180' : ''}`} />
                </div>
              </CardHeader>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CardContent className="space-y-6">
                {data.pricingModel && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Pricing Model</label>
                    <Textarea
                      value={data.pricingModel}
                      onChange={(e) => {
                        setData({ ...data, pricingModel: e.target.value });
                      }}
                      rows={2}
                    />
                  </div>
                )}

                {data.tier1 && (
                  <div className="space-y-4 border p-4 rounded-lg">
                    <h4 className="font-semibold">Tier 1</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Name</label>
                        <Input
                          value={data.tier1.name || ""}
                          onChange={(e) => {
                            setData({
                              ...data,
                              tier1: { ...data.tier1, name: e.target.value },
                            });
                          }}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Price Range</label>
                        <Input
                          value={data.tier1.priceRange || ""}
                          onChange={(e) => {
                            setData({
                              ...data,
                              tier1: { ...data.tier1, priceRange: e.target.value },
                            });
                          }}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {data.tier2 && (
                  <div className="space-y-4 border p-4 rounded-lg">
                    <h4 className="font-semibold">Tier 2</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Name</label>
                        <Input
                          value={data.tier2.name || ""}
                          onChange={(e) => {
                            setData({
                              ...data,
                              tier2: { ...data.tier2, name: e.target.value },
                            });
                          }}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Price Range</label>
                        <Input
                          value={data.tier2.priceRange || ""}
                          onChange={(e) => {
                            setData({
                              ...data,
                              tier2: { ...data.tier2, priceRange: e.target.value },
                            });
                          }}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {data.tier3 && (
                  <div className="space-y-4 border p-4 rounded-lg">
                    <h4 className="font-semibold">Tier 3</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Name</label>
                        <Input
                          value={data.tier3.name || ""}
                          onChange={(e) => {
                            setData({
                              ...data,
                              tier3: { ...data.tier3, name: e.target.value },
                            });
                          }}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Price Range</label>
                        <Input
                          value={data.tier3.priceRange || ""}
                          onChange={(e) => {
                            setData({
                              ...data,
                              tier3: { ...data.tier3, priceRange: e.target.value },
                            });
                          }}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {data.addOns && Array.isArray(data.addOns) && (
                  <div className="space-y-4 border p-4 rounded-lg">
                    <h4 className="font-semibold">Add-ons</h4>
                    <div className="space-y-2">
                      {data.addOns.map((item: string, index: number) => (
                        <div key={index} className="flex gap-2">
                          <Input
                            value={item}
                            onChange={(e) => {
                              const newAddOns = [...data.addOns];
                              newAddOns[index] = e.target.value;
                              setData({ ...data, addOns: newAddOns });
                            }}
                          />
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => {
                              const newAddOns = data.addOns.filter((_: any, i: number) => i !== index);
                              setData({ ...data, addOns: newAddOns });
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                      <Button
                        variant="outline"
                        onClick={() => {
                          setData({ ...data, addOns: [...(data.addOns || []), ""] });
                        }}
                        className="w-full"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Item
                      </Button>
                    </div>
                  </div>
                )}

                {saveMessage && (
                  <div className={`p-3 rounded-md text-sm ${saveMessage.type === 'success'
                    ? 'bg-green-50 text-green-800 border border-green-200'
                    : 'bg-red-50 text-red-800 border border-red-200'
                    }`}>
                    {saveMessage.text}
                  </div>
                )}
                <Button onClick={handleSave} disabled={isSaving} className="w-full">
                  {isSaving ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Save Section
                    </>
                  )}
                </Button>
              </CardContent>
            </CollapsibleContent>
          </Card>
        </Collapsible>
      );
    }
  }

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <Card>
        <CollapsibleTrigger asChild>
          <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <CardTitle>{sectionLabel}</CardTitle>
                {sectionDescription && <CardDescription>{sectionDescription}</CardDescription>}
              </div>
              <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'transform rotate-180' : ''}`} />
            </div>
          </CardHeader>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <CardContent>
            <p className="text-sm text-muted-foreground">Unsupported section type</p>
          </CardContent>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
}








